"use client";

import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <PublicNavbar />
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-8">
                    <div className="text-[12rem] font-black text-slate-200/50 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-primary-600 rounded-[2.5rem] rotate-12 flex items-center justify-center shadow-2xl shadow-primary-500/40">
                            <span className="text-white font-black text-5xl -rotate-12">?</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    Page Not Found
                </h1>
                <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg font-medium">
                    Oops! The page you're looking for doesn't exist or has been moved to another universe.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="premium-button bg-primary-600 text-white flex items-center space-x-2 px-8 py-3"
                    >
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center space-x-2 px-8 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
        </>
    );
}
