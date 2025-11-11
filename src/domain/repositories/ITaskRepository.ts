import { Task } from "../entities/Task";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  findByStatus(status: string): Promise<Task[]>;
}
