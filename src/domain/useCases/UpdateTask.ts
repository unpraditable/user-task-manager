import { Task, TaskStatus } from "../entities/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export class UpdateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string, request: UpdateTaskRequest): Promise<Task> {
    // Find existing task
    const existingTask = await this.taskRepository.findById(taskId);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    // Validate title if provided
    if (request.title !== undefined) {
      if (!request.title.trim()) {
        throw new Error("Title is required");
      }
      existingTask.updateTitle(request.title);
    }

    // Update description if provided
    if (request.description !== undefined) {
      existingTask.updateDescription(request.description);
    }

    // Update status if provided
    if (request.status !== undefined) {
      existingTask.updateStatus(request.status);
    }

    // Save updated task
    return await this.taskRepository.update(existingTask);
  }
}
