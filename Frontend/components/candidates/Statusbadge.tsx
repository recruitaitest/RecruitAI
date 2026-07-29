"use client";

import { Status } from "@/lib/Data";

const STATUS_CONFIG: Record<
 Status,
 { label: string; className: string; dot: string }
> = {
 Applied: {
 label: "Applied",
 className: "bg-surface-hover text-text-secondary border-border",
 dot: "bg-muted",
 },
 Screening: {
 label: "Screening",
 className: "bg-primary/10 text-primary border-primary/20",
 dot: "bg-primary",
 },
 Interviewing: {
 label: "Interviewing",
 className: "bg-warning/10 text-warning border-warning/20",
 dot: "bg-warning",
 },
 Offer: {
 label: "Offer",
 className: "bg-ai-accent/10 text-ai-accent border-ai-accent/20",
 dot: "bg-ai-accent",
 },
 Hired: {
 label: "Hired",
 className: "bg-success/10 text-success border-success/20",
 dot: "bg-success",
 },
 Rejected: {
 label: "Rejected",
 className: "bg-danger/10 text-danger border-danger/20",
 dot: "bg-danger",
 },
};

export function StatusBadge({ status }: { status: Status }) {
 const config = STATUS_CONFIG[status];
 return (
 <span
 className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors duration-base ease-standard ${config.className}`}
 >
 <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-base ease-standard ${config.dot}`} />
 {config.label}
 </span>
 );
}