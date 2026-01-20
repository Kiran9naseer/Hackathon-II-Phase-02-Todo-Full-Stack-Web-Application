"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { TaskStatus, TaskPriority } from "@/types/task";

interface TaskFilterProps {
  onFilterChange: (filters: {
    search?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
  }) => void;
  onClearFilters: () => void;
}

export function TaskFilter({ onFilterChange, onClearFilters }: TaskFilterProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      onFilterChange({
        search: value || undefined,
        status: (status as TaskStatus) || undefined,
        priority: (priority as TaskPriority) || undefined,
      });
    },
    [status, priority, onFilterChange]
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setStatus(value);
      onFilterChange({
        search: search || undefined,
        status: (value as TaskStatus) || undefined,
        priority: (priority as TaskPriority) || undefined,
      });
    },
    [search, priority, onFilterChange]
  );

  const handlePriorityChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setPriority(value);
      onFilterChange({
        search: search || undefined,
        status: (status as TaskStatus) || undefined,
        priority: (value as TaskPriority) || undefined,
      });
    },
    [search, status, onFilterChange]
  );

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setStatus("");
    setPriority("");
    onClearFilters();
  }, [onClearFilters]);

  const hasActiveFilters = search || status || priority;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="search" className="sr-only">
            Search tasks
          </label>
          <Input
            id="search"
            type="search"
            placeholder="Search by title..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="status" className="sr-only">
            Filter by status
          </label>
          <Select
            id="status"
            value={status}
            onChange={handleStatusChange}
            options={[
              { value: "", label: "All statuses" },
              { value: "pending", label: "Pending" },
              { value: "in_progress", label: "In Progress" },
              { value: "completed", label: "Completed" },
            ]}
          />
        </div>
        <div>
          <label htmlFor="priority" className="sr-only">
            Filter by priority
          </label>
          <Select
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
            options={[
              { value: "", label: "All priorities" },
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
