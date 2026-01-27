"use client";

import { Folder, Hash, Star, LayoutGrid, Plus, MoreHorizontal } from "lucide-react";

export default function CategoriesPage() {
    const categories = [
        { title: "Core Architecture", count: 8, color: "from-blue-500 to-indigo-600", icon: Folder },
        { title: "Strategic Roadmap", count: 12, color: "from-purple-500 to-pink-600", icon: LayoutGrid },
        { title: "Neural Research", count: 5, color: "from-amber-400 to-orange-500", icon: Hash },
        { title: "Priority Vectors", count: 15, color: "from-emerald-400 to-teal-500", icon: Star }
    ];

    return (
        <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 relative z-10">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">Classification Engine Active</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4 italic">Neural <span className="text-slate-300 dark:text-slate-700">Clusters.</span></h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg tracking-tight">Organizing your workspace into <span className="text-slate-950 dark:text-slate-200 font-black">strategic data pools</span>.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="premium-button bg-slate-950 dark:bg-white dark:text-slate-950 text-white hover:bg-black dark:hover:bg-slate-100 flex items-center space-x-3 py-4 px-10 shadow-premium-xl group italic">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                        <span>Initialize Cluster</span>
                    </button>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {categories.map((category, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="glass-card bg-white dark:bg-slate-900/40 p-8 rounded-[3rem] border border-slate-50 dark:border-slate-800 shadow-premium-xl group-hover:scale-[1.05] group-hover:shadow-2xl transition-all relative overflow-hidden h-full">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-[0.03] group-hover:opacity-[0.1] -mr-16 -mt-16 rounded-full transition-all duration-700`}></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className={`w-16 h-16 bg-gradient-to-tr ${category.color} rounded-[2rem] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500 shadow-primary-500/20`}>
                                        <category.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-300 transition-all">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tighter uppercase">{category.title}.</h3>
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">{category.count} Strategic Nodes</span>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(j => (
                                            <div key={j} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Category Placeholder */}
                <div className="group cursor-pointer">
                    <div className="h-full border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 hover:border-primary-200 dark:hover:border-primary-800 transition-all group-hover:scale-[1.02]">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-all">
                            <Plus className="w-8 h-8 text-slate-300 group-hover:text-primary-500" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] italic">New Cluster α</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
