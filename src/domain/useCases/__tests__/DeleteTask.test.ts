import { ITaskRepository } from "../../repositories/ITaskRepository";
import { Task } from "../../entities/Task";
import { DeleteTask } from "../DeleteTask";

// Mock the repository
const mockTaskRepository: jest.Mocked<ITaskRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByStatus: jest.fn(),
};

describe("DeleteTask", () => {
  let deleteTask: DeleteTask;

  beforeEach(() => {
    deleteTask = new DeleteTask(mockTaskRepository);
    jest.clearAllMocks();
  });

  it("should delete a task successfully", async () => {
    const existingTask = new Task("1", "Test Task", "Test Description");
    mockTaskRepository.findById.mockResolvedValue(existingTask);
    mockTaskRepository.delete.mockResolvedValue();

    await deleteTask.execute("1");

    expect(mockTaskRepository.findById).toHaveBeenCalledWith("1");
    expect(mockTaskRepository.delete).toHaveBeenCalledWith("1");
  });

  it("should throw error when task not found", async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    await expect(deleteTask.execute("1")).rejects.toThrow("Task not found");
  });
});
