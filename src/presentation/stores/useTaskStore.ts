import { create } from "zustand";
import { Task, TaskStatus } from "@/domain/entities/Task";
import { GetTasks } from "@/domain/useCases/GetTasks";
import { CreateTask } from "@/domain/useCases/CreateTask";
import { UpdateTask } from "@/domain/useCases/UpdateTask";
import { DeleteTask } from "@/domain/useCases/DeleteTask";
import { InMemoryTaskRepository } from "@/domain/repositories/InMemoryTaskRepository";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  editingTask: Task | null;
  createTask: (title: string, description: string) => Promise<void>;
  getTasks: (status?: TaskStatus) => Promise<void>;
  updateTask: (
    taskId: string,
    updates: { title?: string; description?: string; status?: TaskStatus }
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  filterTasks: (status?: TaskStatus) => void;
  setEditingTask: (task: Task | null) => void;
  clearError: () => void;
}

const taskRepository = new InMemoryTaskRepository();
const createTaskUseCase = new CreateTask(taskRepository);
const getTasksUseCase = new GetTasks(taskRepository);
const updateTaskUseCase = new UpdateTask(taskRepository);
const deleteTaskUseCase = new DeleteTask(taskRepository);

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  editingTask: null,

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

  updateTask: async (
    taskId: string,
    updates: { title?: string; description?: string; status?: TaskStatus }
  ) => {
    set({ loading: true, error: null });
    try {
      await updateTaskUseCase.execute(taskId, updates);
      const tasks = await getTasksUseCase.execute();
      set({
        tasks,
        filteredTasks: tasks,
        loading: false,
        editingTask: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteTask: async (taskId: string) => {
    set({ loading: true, error: null });
    try {
      await deleteTaskUseCase.execute(taskId);
      const tasks = await getTasksUseCase.execute();
      set({
        tasks,
        filteredTasks: tasks,
        loading: false,
        editingTask: null,
      });
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

  setEditingTask: (task: Task | null) => {
    set({ editingTask: task });
  },

  clearError: () => {
    set({ error: null });
  },
}));
