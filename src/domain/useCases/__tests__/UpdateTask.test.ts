import { ITaskRepository } from "../../repositories/ITaskRepository";
import { Task, TaskStatus } from "../../entities/Task";
import { UpdateTask } from "../UpdateTask";

// Mock the repository
const mockTaskRepository: jest.Mocked<ITaskRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByStatus: jest.fn(),
};

describe("UpdateTask", () => {
  let updateTask: UpdateTask;

  beforeEach(() => {
    updateTask = new UpdateTask(mockTaskRepository);
    jest.clearAllMocks();
  });

  it("should update a task successfully", async () => {
    const existingTask = new Task(
      "1",
      "Old Title",
      "Old Description",
      TaskStatus.TODO
    );
    const updateData = {
      title: "Updated Title",
      description: "Updated Description",
      status: TaskStatus.IN_PROGRESS,
    };

    mockTaskRepository.findById.mockResolvedValue(existingTask);

    // Create a new Task instance with updated data for the mock response
    const updatedTask = new Task(
      "1",
      updateData.title,
      updateData.description,
      updateData.status,
      existingTask.createdAt,
      new Date() // updatedAt should be newer
    );
    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const result = await updateTask.execute("1", updateData);

    expect(mockTaskRepository.findById).toHaveBeenCalledWith("1");
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        title: "Updated Title",
        description: "Updated Description",
        status: TaskStatus.IN_PROGRESS,
      })
    );
    expect(result.title).toBe("Updated Title");
    expect(result.description).toBe("Updated Description");
    expect(result.status).toBe(TaskStatus.IN_PROGRESS);
    expect(result).toBeInstanceOf(Task); // Ensure it's a Task instance
  });

  it("should throw error when task not found", async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    await expect(
      updateTask.execute("1", { title: "New Title" })
    ).rejects.toThrow("Task not found");
  });

  it("should throw error when title is empty", async () => {
    const existingTask = new Task("1", "Old Title", "Old Description");
    mockTaskRepository.findById.mockResolvedValue(existingTask);

    await expect(updateTask.execute("1", { title: "" })).rejects.toThrow(
      "Title is required"
    );
  });

  it("should update only provided fields", async () => {
    const existingTask = new Task(
      "1",
      "Old Title",
      "Old Description",
      TaskStatus.TODO
    );
    mockTaskRepository.findById.mockResolvedValue(existingTask);

    // Create a new Task instance with only the title updated
    const updatedTask = new Task(
      "1",
      "Updated Title",
      existingTask.description, // Keep original description
      existingTask.status, // Keep original status
      existingTask.createdAt,
      new Date() // updatedAt should be newer
    );
    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const result = await updateTask.execute("1", { title: "Updated Title" });

    expect(result.title).toBe("Updated Title");
    expect(result.description).toBe("Old Description"); // Should remain unchanged
    expect(result.status).toBe(TaskStatus.TODO); // Should remain unchanged
    expect(result).toBeInstanceOf(Task); // Ensure it's a Task instance
  });
});
