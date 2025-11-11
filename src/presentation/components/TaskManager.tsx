"use client";

import { useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { EditTaskForm } from "./EditTaskForm";
import { useTaskStore } from "../stores/useTaskStore";

export const TaskManager: React.FC = () => {
  const { getTasks, editingTask, setEditingTask } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  const handleEditSave = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm />
          </div>

          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </main>

        {editingTask && (
          <EditTaskForm
            task={editingTask}
            onCancel={handleEditCancel}
            onSave={handleEditSave}
          />
        )}
      </div>
    </div>
  );
};
