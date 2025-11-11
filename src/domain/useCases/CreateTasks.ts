import { Task } from "../entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export class CreateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(request: CreateTaskRequest): Promise<Task> {
    if (!request.title.trim()) {
      throw new Error("Title is required");
    }

    const task = new Task(
      this.generateId(),
      request.title,
      request.description
    );

    return await this.taskRepository.create(task);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
