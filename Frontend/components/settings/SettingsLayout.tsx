"use client";

import { ReactNode } from "react";
import { useState } from "react";

interface SettingsLayoutProps {
 children: ReactNode;
 activeTab: string;
 setActiveTab: (tab: any) => void;
}

export default function SettingsLayout({ children, activeTab, setActiveTab }: SettingsLayoutProps) {
 const [showMenu, setShowMenu] = useState(false);
 return (
 <div className="min-h-screen bg-background text-primary transition-colors duration-200">
 <div className="w-full px-4 py-8 md:px-8 lg:px-12">

 {/* Page Header */}
 <div className="mb-8 flex items-start justify-between">
 <div>
 <div className="flex items-center gap-2 text-xs mb-2 font-medium tracking-wide uppercase text-muted">
 <span>Account</span>
 <span>/</span>
 <span className="text-secondary">Settings</span>
 </div>
 <h1 className="text-2xl font-bold tracking-tight text-primary">
 Settings
 </h1>
 <p className="mt-1 text-sm text-muted">
 Manage your account, security, and platform preferences.
 </p>
 </div>

 {/* Status pill */}
 <div className="relative">
 <button
 onClick={() => setShowMenu(!showMenu)}
 className="rounded-lg px-3 py-2 bg-surface border border-border text-primary hover:bg-secondary-surface/50 transition-colors"
 >
 ⋮
 </button>

 {showMenu && (
 <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden z-50 bg-surface border border-border shadow-lg">
 <button
 className="w-full text-left px-4 py-3 hover:bg-secondary-surface text-primary hover:text-primary transition-colors"
 onClick={() => {
 setActiveTab("profile");
 setShowMenu(false);
 }}
 >
 Profile
 </button>

 <button
 className="w-full text-left px-4 py-3 hover:bg-secondary-surface text-primary hover:text-primary transition-colors"
 onClick={() => {
 setActiveTab("security");
 setShowMenu(false);
 }}
 >
 Security
 </button>

 <button
 className="w-full text-left px-4 py-3 hover:bg-secondary-surface text-primary hover:text-primary transition-colors"
 onClick={() => {
 setActiveTab("notifications");
 setShowMenu(false);
 }}
 >
 Notifications
 </button>
 </div>
 )}
 </div>
 </div>

 {/* Grid */}
 <div className="w-full">
 {children}
 </div>
 </div>
 </div>
 );
}