import Link from "next/link";
import { Task } from "@/types/task";
import { formatDate, getPriorityColor, getStatusColor } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleting?: boolean;
}

export function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  isCompleting,
}: TaskItemProps) {
  const isCompleted = task.status === "completed";

  return (
    <div
      className={`flex items-start gap-3 p-4 bg-white rounded-lg border transition-all ${
        isCompleted
          ? "border-gray-200 bg-gray-50"
          : "border-gray-200 hover:border-primary-300 hover:shadow-sm"
      }`}
    >
      <Checkbox
        checked={isCompleted}
        onChange={() => onToggleComplete(task.id)}
        disabled={isCompleting}
        aria-label={`Mark "${task.title}" as ${isCompleted ? "incomplete" : "complete"}`}
      />
      <div className="flex-1 min-w-0">
        <Link
          href={`/tasks/${task.id}`}
          className={`block ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-900"
          }`}
        >
          <h3 className="font-medium truncate">{task.title}</h3>
        </Link>
        {task.description && (
          <p
            className={`text-sm mt-1 line-clamp-2 ${
              isCompleted ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              getStatusColor(task.status)
            }`}
          >
            {task.status.replace("_", " ")}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              getPriorityColor(task.priority)
            }`}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-600 bg-gray-100">
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/tasks/${task.id}`}
          className="p-2 text-gray-400 hover:text-primary-600 rounded transition-colors"
          aria-label={`Edit "${task.title}"`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-gray-400 hover:text-red-600 rounded transition-colors"
          aria-label={`Delete "${task.title}"`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
