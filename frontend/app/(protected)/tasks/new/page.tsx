"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { TaskForm } from "@/components/forms/TaskForm";
import { Button } from "@/components/ui/Button";
import type { CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

export default function NewTaskPage() {
  const router = useRouter();
  const { createTask, isLoading } = useTasks();

  const handleSubmit = async (data: CreateTaskRequest | UpdateTaskRequest) => {
    await createTask(data as CreateTaskRequest);
    router.push("/tasks");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to tasks
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Create New Task</h1>
        <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
