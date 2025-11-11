"use client";

import { Task, TaskStatus } from "@/domain/entities/Task";
import { useTaskStore } from "../stores/useTaskStore";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-gray-200 text-gray-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-yellow-200 text-gray-800";
      case TaskStatus.DONE:
        return "bg-green-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "To Do";
      case TaskStatus.IN_PROGRESS:
        return "In Progress";
      case TaskStatus.DONE:
        return "Done";
      default:
        return status;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg text-gray-700 font-semibold">{task.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {getStatusText(task.status)}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <div className="text-xs text-gray-500">
        Created: {task.createdAt.toLocaleDateString()} | Updated:{" "}
        {task.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
};

export const TaskList: React.FC = () => {
  const { filteredTasks, loading, getTasks, filterTasks } = useTaskStore();

  if (loading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => getTasks()}
          className="px-3 py-1 bg-gray-400 rounded hover:bg-gray-500"
        >
          All
        </button>
        <button
          onClick={() => filterTasks(TaskStatus.TODO)}
          className="px-3 py-1 bg-gray-400 rounded hover:bg-gray-500"
        >
          To Do
        </button>
        <button
          onClick={() => filterTasks(TaskStatus.IN_PROGRESS)}
          className="px-3 py-1 bg-yellow-400 text-gray-700 rounded hover:bg-yellow-500"
        >
          In Progress
        </button>
        <button
          onClick={() => filterTasks(TaskStatus.DONE)}
          className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
        >
          Done
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Create your first task!
        </div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
