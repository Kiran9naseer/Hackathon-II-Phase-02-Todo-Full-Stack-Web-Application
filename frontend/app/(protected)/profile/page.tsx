"use client";

import { User, Settings as SettingsIcon, Bell, Lock, Globe, CreditCard } from "lucide-react";
import { useSession } from "@/lib/auth/provider";

export default function SettingsPage() {
    const { session } = useSession();

    const sections = [
        { label: "Profile Information", icon: User, desc: "Update your personal details and avatar." },
        { label: "Security", icon: Lock, desc: "Manage your password and authentication settings." },
        { label: "Notifications", icon: Bell, desc: "Configure how you receive updates and alerts." },
        { label: "Integration", icon: Globe, desc: "Connect TodoMaster with your favorite tools." },
        { label: "Billing", icon: CreditCard, desc: "Manage your subscription and payment methods.", badge: "Pro" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-16 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
            {/* Background Accent */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <SettingsIcon className="w-4 h-4 text-slate-400 group-hover:rotate-90 transition-transform duration-700" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Workspace Management Core</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 italic">System <span className="text-slate-300">Parameters.</span></h1>
                <p className="text-slate-500 font-medium text-lg tracking-tight">Configure your neural link and workspace synchronization tokens.</p>
            </div>

            {/* Profile Header */}
            <div className="glass-card bg-white p-10 rounded-[3rem] border border-slate-50 flex flex-col md:flex-row items-center gap-10 shadow-premium-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-700"></div>

                <div className="relative">
                    <div className="w-28 h-28 rounded-[2.5rem] bg-slate-950 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden group/avatar">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/40 to-secondary-600/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                        <User className="w-12 h-12 text-white relative z-10" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-2 uppercase">{session?.user?.id.split('-')[0] || "Todo Master"}</h2>
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-lg border border-slate-100">{session?.user?.email || "user@example.com"}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                        <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic border border-primary-100 shadow-sm">Enterprise Core</span>
                        <span className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg">SaaS v2.0 Live</span>
                    </div>
                </div>

                <button className="premium-button bg-slate-950 text-white hover:bg-black py-4 px-10 shadow-premium-xl group active:scale-95 italic text-sm">Update Profile α</button>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {sections.map((s, i) => (
                    <div key={i} className="glass-card bg-white p-8 rounded-[3rem] border border-slate-50 group hover:scale-[1.02] hover:shadow-premium-xl transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 -mr-12 -mt-12 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-950 transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-slate-950">
                                    <s.icon className="w-7 h-7 text-slate-400 group-hover:text-white transition-all duration-500" />
                                </div>
                                {s.badge && (
                                    <span className="px-3 py-1 bg-slate-950 text-white text-[9px] font-black rounded-lg uppercase tracking-widest italic shadow-lg animate-pulse">{s.badge} ACTIVE</span>
                                )}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tighter italic uppercase">{s.label}.</h3>
                            <p className="text-sm font-medium text-slate-400 leading-relaxed italic">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-20 border-t border-slate-100 flex flex-col items-center justify-center">
                <div className="flex items-center space-x-2 mb-4 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(0,0,0,0.2)]"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Encryption Protocol Active</p>
                </div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">TodoMaster Ecosystem | Distributed SaaS Build 2.0.4-stable</p>
            </div>
        </div>
    );
}
