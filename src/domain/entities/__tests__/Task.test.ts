import { Task, TaskStatus } from "../Task";

describe("Task", () => {
  it("should create a task with default values", () => {
    const task = new Task("1", "Test Task", "Test Description");

    expect(task.id).toBe("1");
    expect(task.title).toBe("Test Task");
    expect(task.description).toBe("Test Description");
    expect(task.status).toBe(TaskStatus.TODO);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
  });

  it("should update task properties", () => {
    const task = new Task("1", "Test Task", "Test Description");
    const newDate = new Date();

    task.updateTitle("Updated Title");
    task.updateDescription("Updated Description");
    task.updateStatus(TaskStatus.IN_PROGRESS);

    expect(task.title).toBe("Updated Title");
    expect(task.description).toBe("Updated Description");
    expect(task.status).toBe(TaskStatus.IN_PROGRESS);
    expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(newDate.getTime());
  });

  it("should mark task as done", () => {
    const task = new Task("1", "Test Task", "Test Description");

    task.markAsDone();

    expect(task.status).toBe(TaskStatus.DONE);
  });
});
