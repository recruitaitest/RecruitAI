"use client";

import { motion } from "framer-motion";

import {
 Inbox,
 MailPlus,
 Sparkles,
} from "lucide-react";

interface MailboxEmptyStateProps {
 onConnect?: () => void;
}

export default function MailboxEmptyState({
 onConnect,
}: MailboxEmptyStateProps) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3 }}
 className="
 flex flex-col items-center justify-center
 rounded-2xl
 border border-dashed border-border
 bg-white/[0.03]
 px-6 py-20
 text-center
 "
 >
 {/* Icon */}
 <div
 className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-soft shadow-md transition-transform duration-slow hover:scale-105"
 >
 <Inbox className="h-12 w-12 text-primary" />
 </div>

 {/* Title */}
 <h2 className="mt-8 text-3xl font-bold text-text-primary">
 No Mailboxes Connected
 </h2>

 {/* Description */}
 <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
 Connect recruiter mailboxes to automatically ingest applicant
 emails, extract resumes, and create searchable candidate
 profiles powered by AI recruitment intelligence.
 </p>

 {/* Features */}
 <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

 <div
 className="
 flex items-center gap-2
 rounded-xl
 border border-border
 bg-secondary-surface
 px-4 py-2
 "
 >
 <Sparkles className="h-4 w-4 text-primary" />

 <span className="text-sm text-text-secondary">
 AI Resume Parsing
 </span>
 </div>

 <div
 className="
 flex items-center gap-2
 rounded-xl
 border border-border
 bg-secondary-surface
 px-4 py-2
 "
 >
 <Sparkles className="h-4 w-4 text-primary" />

 <span className="text-sm text-text-secondary">
 Email Synchronization
 </span>
 </div>

 <div
 className="
 flex items-center gap-2
 rounded-xl
 border border-border
 bg-secondary-surface
 px-4 py-2
 "
 >
 <Sparkles className="h-4 w-4 text-primary" />

 <span className="text-sm text-text-secondary">
 Candidate Automation
 </span>
 </div>
 </div>

 {/* Button */}
 <button
 onClick={onConnect}
 className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-base ease-standard hover:bg-primary-hover active:scale-[0.97] focus-ring"
 >
 <MailPlus className="h-5 w-5" />
 Connect Your First Mailbox
 </button>
 </motion.div>
 );
}