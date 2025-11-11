import { ITaskRepository } from "../repositories/ITaskRepository";

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    // Verify task exists
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    // Delete task
    await this.taskRepository.delete(taskId);
  }
}
