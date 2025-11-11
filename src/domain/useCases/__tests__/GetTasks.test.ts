import { ITaskRepository } from "../../repositories/ITaskRepository";
import { Task, TaskStatus } from "../../entities/Task";
import { GetTasks } from "../GetTasks";

describe("GetTasks", () => {
  let getTasks: GetTasks;
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
    getTasks = new GetTasks(mockTaskRepository);
  });

  it("should return all tasks", async () => {
    const tasks = [
      new Task("1", "Task 1", "Description 1"),
      new Task("2", "Task 2", "Description 2"),
    ];
    mockTaskRepository.findAll.mockResolvedValue(tasks);

    const result = await getTasks.execute();

    expect(mockTaskRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it("should return tasks filtered by status", async () => {
    const tasks = [new Task("1", "Task 1", "Description 1", TaskStatus.DONE)];
    mockTaskRepository.findByStatus.mockResolvedValue(tasks);

    const result = await getTasks.execute(TaskStatus.DONE);

    expect(mockTaskRepository.findByStatus).toHaveBeenCalledWith(
      TaskStatus.DONE
    );
    expect(result).toEqual(tasks);
  });
});
