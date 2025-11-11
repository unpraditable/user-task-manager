import { ITaskRepository } from "../../repositories/ITaskRepository";
import { Task } from "../../entities/Task";
import { CreateTask } from "../CreateTask";

describe("CreateTask", () => {
  let createTask: CreateTask;
  let mockTaskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    createTask = new CreateTask(mockTaskRepository);
  });

  it("should create a task successfully", async () => {
    const taskData = {
      title: "Test Task",
      description: "Test Description",
    };

    const createdTask = new Task("1", taskData.title, taskData.description);
    mockTaskRepository.create.mockResolvedValue(createdTask);

    const result = await createTask.execute(taskData);

    expect(mockTaskRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: taskData.title,
        description: taskData.description,
      })
    );
    expect(result).toEqual(createdTask);
  });

  it("should throw error when title is empty", async () => {
    const taskData = {
      title: "",
      description: "Test Description",
    };

    await expect(createTask.execute(taskData)).rejects.toThrow(
      "Title is required"
    );
  });
});
