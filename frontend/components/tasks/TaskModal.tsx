"use client";

import { TaskForm } from "@/components/forms/TaskForm";
import { X, Plus } from "lucide-react";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function TaskModal({ isOpen, onClose, title }: TaskModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
            {/* Backdrop with Ultra Blur */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            {/* Command Menu Style Modal */}
            <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden border border-white">
                {/* Header Section */}
                <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-slate-50">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center">
                            <Plus className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h2>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">SaaS Workflow • Core Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="hidden sm:flex px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 border border-slate-200 uppercase tracking-tighter">Esc</span>
                        <button
                            onClick={onClose}
                            className="p-2.5 hover:bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all active:scale-95"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-10">
                    <TaskForm
                        onSubmit={async (data) => {
                            onClose();
                        }}
                    />
                </div>

                {/* Bottom Tip Section */}
                <div className="bg-slate-50/50 px-10 py-4 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                        Tip: Set priorities to optimize your dashboard analytics.
                    </p>
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
