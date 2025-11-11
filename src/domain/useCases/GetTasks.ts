import { Task, TaskStatus } from "../entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";

export class GetTasks {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      return await this.taskRepository.findByStatus(status);
    }
    return await this.taskRepository.findAll();
  }
}
