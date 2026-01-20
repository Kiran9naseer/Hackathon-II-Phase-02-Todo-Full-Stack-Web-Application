import { useState, useCallback } from "react";
import { taskApi } from "@/lib/api/tasks";
import type { Task, CreateTaskRequest, UpdateTaskRequest, TaskFilters } from "@/types/task";

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: (filters?: TaskFilters) => Promise<void>;
  createTask: (data: CreateTaskRequest) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskRequest) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<Task>;
  setTasks: (tasks: Task[]) => void;
  clearError: () => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (filters?: TaskFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskApi.getAll(filters);
      setTasks(response.tasks);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch tasks";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: CreateTaskRequest): Promise<Task> => {
    setError(null);
    try {
      const task = await taskApi.create(data);
      setTasks((prev) => [task, ...prev]);
      return task;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create task";
      setError(message);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskRequest): Promise<Task> => {
    setError(null);
    try {
      const task = await taskApi.update(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      return task;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update task";
      setError(message);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    setError(null);
    try {
      await taskApi.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task";
      setError(message);
      throw err;
    }
  }, []);

  const completeTask = useCallback(async (id: string): Promise<Task> => {
    setError(null);
    try {
      const task = await taskApi.complete(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      return task;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to complete task";
      setError(message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    setTasks,
    clearError,
  };
}
