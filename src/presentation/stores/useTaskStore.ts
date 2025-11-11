import { create } from "zustand";
import { Task, TaskStatus } from "@/domain/entities/Task";
import { GetTasks } from "@/domain/useCases/GetTasks";
import { CreateTask } from "@/domain/useCases/CreateTasks";
import { InMemoryTaskRepository } from "@/domain/repositories/InMemoryTaskRepository";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (title: string, description: string) => Promise<void>;
  getTasks: (status?: TaskStatus) => Promise<void>;
  filterTasks: (status?: TaskStatus) => void;
}

const taskRepository = new InMemoryTaskRepository();
const createTaskUseCase = new CreateTask(taskRepository);
const getTasksUseCase = new GetTasks(taskRepository);

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,

  createTask: async (title: string, description: string) => {
    set({ loading: true, error: null });
    try {
      await createTaskUseCase.execute({ title, description });
      const tasks = await getTasksUseCase.execute();
      set({ tasks, filteredTasks: tasks, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  getTasks: async (status?: TaskStatus) => {
    set({ loading: true, error: null });
    try {
      const tasks = await getTasksUseCase.execute(status);
      set({ tasks, filteredTasks: tasks, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  filterTasks: (status?: TaskStatus) => {
    const { tasks } = get();
    if (!status) {
      set({ filteredTasks: tasks });
    } else {
      const filteredTasks = tasks.filter((task) => task.status === status);
      set({ filteredTasks });
    }
  },
}));
