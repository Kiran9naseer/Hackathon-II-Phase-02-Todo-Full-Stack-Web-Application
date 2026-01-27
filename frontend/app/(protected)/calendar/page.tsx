"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin } from "lucide-react";

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock events for the premium look
    const events = [
        { date: 15, title: "Product Sync α", type: "meeting" },
        { date: 18, title: "Deploy Workspace", type: "task" },
        { date: 22, title: "Core Architecture Review", type: "review" }
    ];

    return (
        <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 relative z-10">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">Temporal Core Active</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4 italic">Neural <span className="text-slate-300 dark:text-slate-700">Timeline.</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg tracking-tight">Navigating through your strategic roadmap for <span className="text-slate-950 dark:text-slate-200 font-black">January '26</span>.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="premium-button bg-slate-950 dark:bg-white dark:text-slate-950 text-white hover:bg-black dark:hover:bg-slate-100 flex items-center space-x-3 py-4 px-10 shadow-premium-xl group italic">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                        <span>Schedule Node</span>
                    </button>
                </div>
            </div>

            {/* Premium Calendar Grid */}
            <div className="glass-card bg-white dark:bg-slate-900/40 p-10 rounded-[3rem] border border-slate-50 dark:border-slate-800 shadow-premium-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex items-center justify-between mb-12 relative z-10">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">January 2026</h2>
                    <div className="flex items-center space-x-2">
                        <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-all border border-slate-100 dark:border-slate-800">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl text-slate-400 transition-all border border-slate-100 dark:border-slate-800">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 relative z-10">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center pb-6">
                            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] italic">{day}</span>
                        </div>
                    ))}

                    {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const hasEvent = events.find(e => e.date === day);
                        const isToday = day === 28;

                        return (
                            <div key={i} className={`min-h-[140px] p-6 rounded-[2rem] border transition-all relative group cursor-pointer ${isToday
                                    ? 'bg-slate-950 dark:bg-white border-slate-950 dark:border-white shadow-2xl scale-[1.05] z-20'
                                    : 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-premium-xl active:scale-95'
                                }`}>
                                <span className={`text-xl font-black italic tracking-tighter transition-colors ${isToday ? 'text-white dark:text-slate-950' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white'
                                    }`}>
                                    {day < 10 ? `0${day}` : day}
                                </span>

                                {hasEvent && (
                                    <div className="mt-4 space-y-2">
                                        <div className={`p-2.5 rounded-xl border flex flex-col items-start gap-1 transition-all ${isToday ? 'bg-white/10 border-white/20 text-white' : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-700 shadow-sm'
                                            }`}>
                                            <span className={`text-[8px] font-black uppercase tracking-wider italic ${isToday ? 'text-white/60' : 'text-primary-500'
                                                }`}>
                                                {hasEvent.type}
                                            </span>
                                            <span className="text-[10px] font-bold line-clamp-1">{hasEvent.title}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="glass-card bg-white dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 shadow-premium-xl group hover:scale-[1.02] transition-all">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary-500" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white italic tracking-tighter uppercase">Local Nodes.</h3>
                    </div>
                    <p className="text-sm font-medium text-slate-400 italic">Syncing across 3 strategic locations for today's roadmap execution.</p>
                </div>
                {/* Add more info cards if needed */}
            </div>
        </div>
    );
}
