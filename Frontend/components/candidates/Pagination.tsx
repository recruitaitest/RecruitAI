"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
 page: number;
 totalPages: number;
 total: number;
 perPage: number;
 onPage: (p: number) => void;
}

export function Pagination({
 page,
 totalPages,
 total,
 perPage,
 onPage,
}: PaginationProps) {
 const start = Math.min((page - 1) * perPage + 1, total);
 const end = Math.min(page * perPage, total);

 const pages: (number | "...")[] = [];
 if (totalPages <= 7) {
 for (let i = 1; i <= totalPages; i++) pages.push(i);
 } else {
 pages.push(1);
 if (page > 3) pages.push("...");
 for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++)
 pages.push(i);
 if (page < totalPages - 2) pages.push("...");
 pages.push(totalPages);
 }

 return (
 <div className="flex items-center justify-between px-4 py-3">
 <span className="text-sm text-muted">
 Showing <span className="font-medium text-slate-600">{start}–{end}</span> of{" "}
 <span className="font-medium text-slate-600">{total}</span> candidates
 </span>
 <div className="flex items-center gap-1">
 <button
 disabled={page <= 1}
 onClick={() => onPage(page - 1)}
 className="p-1.5 rounded-lg text-muted transition-all duration-base ease-standard hover:text-slate-600 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
 aria-label="Previous page"
 >
 <ChevronLeft className="w-4 h-4" />
 </button>
 {pages.map((p, i) =>
 p === "..." ? (
 <span key={`ellipsis-${i}`} className="px-2 text-muted text-sm">…</span>
 ) : (
 <button
 key={p}
 onClick={() => onPage(p as number)}
 className={`relative w-8 h-8 rounded-lg text-sm font-medium transition-all duration-base ease-standard focus-ring hover:scale-[1.02] active:scale-95 flex items-center justify-center ${p === page
 ? "text-primary-foreground shadow-sm"
 : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
 }`}
 >
 {p === page && (
 <motion.div
 layoutId="pagination-active"
 className="absolute inset-0 bg-primary rounded-lg"
 initial={false}
 transition={{ type: "spring", stiffness: 300, damping: 30 }}
 />
 )}
 <span className="relative z-10">{p}</span>
 </button>
 )
 )}
 <button
 disabled={page >= totalPages}
 onClick={() => onPage(page + 1)}
 className="p-1.5 rounded-lg text-muted transition-all duration-base ease-standard hover:text-slate-600 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
 aria-label="Next page"
 >
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 </div>
 );
}