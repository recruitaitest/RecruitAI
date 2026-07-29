"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getInterviews } from "@/services/interviewService";
import { Interview } from "@/types/interview";

interface Props {
 open: boolean;
 onClose: () => void;
 candidateId?: string | number;
}

export default function ViewInterviewModal({ open, onClose, candidateId }: Props) {
 const [interviews, setInterviews] = useState<Interview[]>([]);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
 if (open && candidateId) {
 setLoading(true);
 getInterviews()
 .then((data: Interview[]) => {
 // Filter interviews for the candidate
 const candidateInterviews = data.filter(
 (i) => Number(i.candidate_id) === Number(candidateId)
 );
 setInterviews(candidateInterviews);
 })
 .catch((err) => {
 console.error("Failed to load interviews", err);
 })
 .finally(() => {
 setLoading(false);
 });
 } else {
 setInterviews([]);
 }
 }, [open, candidateId]);

 if (!open) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="flex w-full max-w-2xl flex-col rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh]"
 >
 <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
 <div>
 <h2 className="text-2xl font-bold text-text-primary">View Interviews</h2>
 <p className="mt-1 text-sm text-muted">
 Interviews scheduled for the candidate
 </p>
 </div>
 <button
 onClick={onClose}
 className="rounded-xl p-2 transition hover:bg-secondary-surface"
 >
 <X className="h-5 w-5 text-muted" />
 </button>
 </div>

 <div className="space-y-6 overflow-y-auto p-6">
 {loading ? (
 <div className="text-muted">Loading interview details...</div>
 ) : interviews.length > 0 ? (
 <div className="space-y-4">
 {interviews.map((interview) => (
 <div key={interview.id} className="rounded-xl border border-border bg-surface p-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="text-xs text-muted">Type</label>
 <div className="text-text-primary">{interview.interview_type}</div>
 </div>
 <div>
 <label className="text-xs text-muted">Status</label>
 <div className="text-text-primary">{interview.status}</div>
 </div>
 <div>
 <label className="text-xs text-muted">Date & Time</label>
 <div className="text-text-primary">{interview.interview_date} at {interview.interview_time}</div>
 </div>
 <div>
 <label className="text-xs text-muted">Mode</label>
 <div className="text-text-primary">{interview.interview_mode}</div>
 </div>
 {interview.meeting_link && (
 <div className="col-span-2">
 <label className="text-xs text-muted">Meeting Link</label>
 <div className="text-primary truncate font-medium">
 <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer">{interview.meeting_link}</a>
 </div>
 </div>
 )}
 {interview.location && (
 <div className="col-span-2">
 <label className="text-xs text-muted">Location</label>
 <div className="text-text-primary">{interview.location}</div>
 </div>
 )}
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="text-muted">No interviews found for this candidate.</div>
 )}
 </div>

 <div className="flex shrink-0 items-center justify-end gap-4 border-t border-border px-6 py-5">
 <button
 onClick={onClose}
 className="rounded-2xl bg-secondary-surface px-6 py-3 font-medium text-text-primary transition hover:bg-slate-700"
 >
 Close
 </button>
 </div>
 </motion.div>
 </div>
 );
}
