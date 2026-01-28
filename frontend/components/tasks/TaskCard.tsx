"use client";

import Link from "next/link";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";
import { Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const priorityStyles = {
    high: isDark ? 'bg-red-900/40 text-red-300' : 'bg-red-50 text-red-600',
    medium: isDark ? 'bg-orange-900/40 text-orange-300' : 'bg-orange-50 text-orange-600',
    low: isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-600',
  };

  return (
    <div
      className={`card-elevated relative group p-6 rounded-2xl ${
        isCompleted
          ? isDark
            ? 'opacity-60 bg-slate-900/50'
            : 'opacity-70 bg-slate-50/50'
          : ''
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
            priorityStyles[task.priority as keyof typeof priorityStyles] || priorityStyles.low
          }`}
        >
          {task.priority}
        </span>
        <Checkbox
          checked={isCompleted}
          onChange={() => onToggleComplete(task.id)}
          disabled={isCompleting}
          className={`w-5 h-5 rounded-lg border-2 transition-all ${
            isDark
              ? 'border-slate-600 checked:bg-green-600 checked:border-green-600'
              : 'border-slate-300 checked:bg-green-500 checked:border-green-500'
          }`}
        />
      </div>

      <Link href={`/tasks/${task.id}`} className="block mb-2">
        <h3
          className={`font-bold text-lg leading-tight transition-colors group-hover:text-primary-600 ${
            isCompleted
              ? isDark
                ? 'text-slate-500 line-through'
                : 'text-slate-400 line-through'
              : isDark
              ? 'text-slate-100'
              : 'text-slate-900'
          }`}
        >
          {task.title}
        </h3>
      </Link>

      {task.description && (
        <p
          className={`text-sm line-clamp-2 mb-4 leading-relaxed font-medium ${
            isCompleted
              ? isDark
                ? 'text-slate-500'
                : 'text-slate-400'
              : isDark
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}
        >
          {task.description}
        </p>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Progress
          </span>
          <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400">
            {isCompleted ? '100%' : '65%'}
          </span>
        </div>
        <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isCompleted
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-primary-500 to-secondary-500'
            }`}
            style={{ width: isCompleted ? '100%' : '65%' }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t mt-auto"
        style={{borderColor: isDark ? '#475569' : '#e2e8f0'}}>
        <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px] font-bold">
            {formatDate(task.dueDate || task.createdAt)}
          </span>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(task.id)}
            className={`p-2 rounded-lg transition-all ${
              isDark
                ? 'hover:bg-red-900/40 text-slate-500 hover:text-red-400'
                : 'hover:bg-red-50 text-slate-400 hover:text-red-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isCompleting && (
        <div
          className={`absolute inset-0 rounded-2xl flex items-center justify-center backdrop-blur-sm ${
            isDark ? 'bg-slate-900/40' : 'bg-white/60'
          }`}
        >
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
