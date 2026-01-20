"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilter } from "@/components/tasks/TaskFilter";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/Modal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { TaskFilters, TaskStatus, TaskPriority } from "@/types/task";

export default function TasksPage() {
  const router = useRouter();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    updateTask,
    deleteTask,
    setTasks,
  } = useTasks();

  const [completingId, setCompletingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const newStatus: TaskStatus =
        task.status === "completed" ? "pending" : "completed";

      setCompletingId(id);
      try {
        const updatedTask = await updateTask(id, { status: newStatus });
        // Optimistic update already handled in hook
      } catch (err) {
        console.error("Failed to toggle task:", err);
        // Revert would happen here if we tracked previous state
      } finally {
        setCompletingId(null);
      }
    },
    [tasks, updateTask]
  );

  const handleDeleteClick = useCallback((id: string) => {
    setTaskToDelete(id);
    setShowDeleteDialog(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!taskToDelete) return;

    setDeletingId(taskToDelete);
    setShowDeleteDialog(false);
    try {
      await deleteTask(taskToDelete);
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setDeletingId(null);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const handleFilterChange = useCallback(
    async (filters: { search?: string; status?: TaskStatus; priority?: TaskPriority }) => {
      await fetchTasks(filters as TaskFilters);
    },
    [fetchTasks]
  );

  const handleClearFilters = useCallback(() => {
    setTasks([]);
    fetchTasks();
  }, [setTasks, fetchTasks]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 text-red-500 mx-auto mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => fetchTasks()}>Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-1">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>
        <Link href="/tasks/new">
          <Button>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Task
          </Button>
        </Link>
      </div>

      <TaskFilter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

      {isLoading && tasks.length === 0 ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          message="Get started by creating your first task."
          actionLabel="Create your first task"
          onAction={() => router.push("/tasks/new")}
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          }
        />
      ) : (
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteClick}
          completingId={completingId}
        />
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        isLoading={!!deletingId}
      />
    </div>
  );
}
