"use client";

import { useEffect } from "react";
import { TaskForm } from "@/presentation/components/TaskForm";
import { TaskList } from "@/presentation/components/TaskList";
import { useTaskStore } from "@/presentation/stores/useTaskStore";

export default function Home() {
  const { getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-gray-600">
            Collaborative task management made simple
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm />
          </div>

          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
}
