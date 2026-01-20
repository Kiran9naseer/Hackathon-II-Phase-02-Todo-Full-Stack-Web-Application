"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, type CreateTaskSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import type { Task, CreateTaskRequest, UpdateTaskRequest } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskRequest | UpdateTaskRequest) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          categoryId: task.categoryId || "",
          dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        }
      : {
          priority: "medium",
        },
  });

  const onFormSubmit = async (data: CreateTaskSchema) => {
    setSubmitError(null);
    try {
      const submitData: CreateTaskRequest | UpdateTaskRequest = {
        title: data.title,
        description: data.description || undefined,
        priority: data.priority,
        categoryId: data.categoryId || undefined,
        dueDate: data.dueDate || undefined,
      };
      await onSubmit(submitData);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6" noValidate>
      {submitError && (
        <div
          className="p-3 text-sm text-red-600 bg-red-50 rounded-md"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          disabled={isLoading}
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p className="text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Add more details..."
          disabled={isLoading}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            disabled={isLoading}
            {...register("priority")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            disabled={isLoading}
            {...register("dueDate")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? task
              ? "Saving..."
              : "Creating..."
            : task
            ? "Save Changes"
            : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
