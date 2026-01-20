import Link from "next/link";
import { Task } from "@/types/task";
import { formatDate, getPriorityColor, getStatusColor, truncate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isCompleting?: boolean;
}

export function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  isCompleting,
}: TaskCardProps) {
  const isCompleted = task.status === "completed";

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border transition-all ${
        isCompleted
          ? "border-gray-200 opacity-75"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
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
              <h3 className="font-semibold text-lg truncate">{task.title}</h3>
            </Link>
            {task.description && (
              <p
                className={`text-sm mt-1 ${
                  isCompleted ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {truncate(task.description, 100)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
              getStatusColor(task.status)
            }`}
          >
            {task.status.replace("_", " ")}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
              getPriorityColor(task.priority)
            }`}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Created {formatDate(task.createdAt)}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/tasks/${task.id}`}
              className="p-1.5 text-gray-400 hover:text-primary-600 rounded transition-colors"
              aria-label={`Edit "${task.title}"`}
            >
              <svg
                className="w-4 h-4"
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
              className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
              aria-label={`Delete "${task.title}"`}
            >
              <svg
                className="w-4 h-4"
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
      </div>
    </div>
  );
}
