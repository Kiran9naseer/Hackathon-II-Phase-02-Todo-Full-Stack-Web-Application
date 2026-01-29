"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/useCategories";
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
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
        categoryId: "",
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
          className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl animate-pulse"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-slate-700 font-semibold ml-1">Task Title *</Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g. Design System Overhaul"
          className="premium-input w-full"
          disabled={isLoading}
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p className="text-xs text-red-500 font-medium ml-1" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-slate-700 font-semibold ml-1">Notes & Context</Label>
        <textarea
          id="description"
          className="premium-input w-full min-h-[120px] resize-none"
          placeholder="What are the key details for this task?"
          disabled={isLoading}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-500 font-medium ml-1" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label htmlFor="priority" className="text-slate-700 font-semibold ml-1">Priority Level</Label>
          <Select
            id="priority"
            className="premium-input w-full appearance-none"
            options={[
              { value: "low", label: "Low Priority" },
              { value: "medium", label: "Medium Priority" },
              { value: "high", label: "High Priority" },
            ]}
            disabled={isLoading}
            {...register("priority")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="categoryId" className="text-slate-700 font-semibold ml-1">Category</Label>
          <Select
            id="categoryId"
            className="premium-input w-full appearance-none"
            options={[
              { value: "", label: "No Category" },
              ...categories.map(c => ({ value: c.id, label: c.name }))
            ]}
            disabled={isLoading}
            {...register("categoryId")}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="dueDate" className="text-slate-700 font-semibold ml-1">Target Date</Label>
          <Input
            id="dueDate"
            type="date"
            className="premium-input w-full"
            disabled={isLoading}
            {...register("dueDate")}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="hover:bg-slate-100 rounded-xl text-slate-500 font-bold"
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="premium-button bg-primary-600 text-white hover:bg-primary-700 px-8" disabled={isLoading}>
          {isLoading
            ? (
              <div className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            )
            : task
              ? "Sync Changes"
              : "Launch Task"}
        </Button>
      </div>
    </form>
  );
}
