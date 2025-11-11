export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export class Task {
  public readonly id: string;
  public title: string;
  public description: string;
  public status: TaskStatus;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    status: TaskStatus = TaskStatus.TODO,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  updateTitle(title: string): void {
    this.title = title;
    this.updateTimestamp();
  }

  updateDescription(description: string): void {
    this.description = description;
    this.updateTimestamp();
  }

  updateStatus(status: TaskStatus): void {
    this.status = status;
    this.updateTimestamp();
  }

  markAsDone(): void {
    this.updateStatus(TaskStatus.DONE);
  }

  markAsInProgress(): void {
    this.updateStatus(TaskStatus.IN_PROGRESS);
  }

  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}
