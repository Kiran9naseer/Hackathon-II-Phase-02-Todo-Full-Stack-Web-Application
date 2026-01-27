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
      className={`glass-card relative group p-6 rounded-[2rem] border-slate-100 hover:border-primary-100 hover:shadow-premium ${isCompleted ? "bg-slate-50/50 opacity-80" : "bg-white"
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${task.priority === 'high' ? 'bg-red-50 text-red-600' :
          task.priority === 'medium' ? 'bg-orange-50 text-orange-600' :
            'bg-blue-50 text-blue-600'
          }`}>
          {task.priority}
        </span>
        <Checkbox
          checked={isCompleted}
          onChange={() => onToggleComplete(task.id)}
          disabled={isCompleting}
          className="w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-green-500 checked:border-green-500 transition-all"
        />
      </div>

      <Link href={`/tasks/${task.id}`} className="block mb-2">
        <h3 className={`font-bold text-lg leading-tight transition-colors group-hover:text-primary-600 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
          {task.title}
        </h3>
      </Link>

      {task.description && (
        <p className={`text-[11px] line-clamp-2 mb-4 leading-relaxed font-medium ${isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
          {task.description}
        </p>
      )}

      {/* Progress Bar - AI Simulated for UI Demo */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
          <span className="text-[10px] font-black text-primary-600 italic">{isCompleted ? '100%' : '65%'}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden p-[1px]">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-primary-500 to-secondary-500'}`}
            style={{ width: isCompleted ? '100%' : '65%' }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-slate-50 mt-auto">
        <div className="flex items-center space-x-2 text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] font-bold">{formatDate(task.dueDate || task.createdAt)}</span>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-600 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      {isCompleting && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xs rounded-[2rem] flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
