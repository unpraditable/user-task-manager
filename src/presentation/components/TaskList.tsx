"use client";

import { Task, TaskStatus } from "@/domain/entities/Task";
import { useTaskStore } from "../stores/useTaskStore";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask, setEditingTask } = useTaskStore();

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-gray-200 text-gray-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-yellow-200 text-yellow-800";
      case TaskStatus.DONE:
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    await updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
    }
  };

  const handleEdit = () => {
    setEditingTask(task);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-3 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )} border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>
        </div>
      </div>

      <p className="text-gray-600 mb-3">{task.description}</p>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Created: {task.createdAt.toLocaleDateString()} | Updated:{" "}
          {task.updatedAt.toLocaleDateString()}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
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
