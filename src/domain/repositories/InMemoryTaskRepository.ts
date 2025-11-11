import { Task, TaskStatus } from "@/domain/entities/Task";
import { ITaskRepository } from "@/domain/repositories/ITaskRepository";

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Map<string, Task> = new Map();

  async create(task: Task): Promise<Task> {
    this.tasks.set(task.id, task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    if (!this.tasks.has(task.id)) {
      throw new Error("Task not found");
    }
    this.tasks.set(task.id, task);
    return task;
  }

  async delete(id: string): Promise<void> {
    this.tasks.delete(id);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) || null;
  }

  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async findByStatus(status: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.status === status
    );
  }
}
