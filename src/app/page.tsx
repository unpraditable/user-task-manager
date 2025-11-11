"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/presentation/stores/useTaskStore";
import { TaskManager } from "@/presentation/components/TaskManager";

export default function Home() {
  const { getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return <TaskManager />;
}
