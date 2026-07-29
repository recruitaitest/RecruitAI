"use client";

import { motion } from "framer-motion";
import {
 Eye,
 Pencil,
 Trash2,
 CheckCircle2,
 XCircle,
} from "lucide-react";

interface Offer {
 id: number;
 candidate_name?: string;
 position_title?: string;
 salary: string;
 employment_type: string;
 joining_date: string;
 offer_expiry: string;
 status: string;
}

interface Props {
 loading: boolean;
 offers: Offer[];
 onView: (offer: Offer) => void;
 onEdit: (offer: Offer) => void;
 onDelete: (offerId: number) => void;
 onRefresh: () => void;
 onStatusChange: (offerId: number, status: string) => void;
}

export default function OfferTable({
 loading,
 offers,
 onView,
 onEdit,
 onDelete,
 onStatusChange, // ✅ was missing from destructuring
}: Props) {

 if (loading) {
 return (
 <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted">
 Loading offers...
 </div>
 );
 }

 return (
 <div className="overflow-hidden rounded-2xl border border-border bg-card">
 <div className="overflow-x-auto">
 <table className="min-w-full">
 <thead className="border-b border-border bg-surface">
 <tr>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Candidate
 </th>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Position
 </th>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Salary
 </th>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Employment
 </th>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Joining
 </th>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Expiry
 </th>
 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
 Status
 </th>
 <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
 Actions
 </th>
 </tr>
 </thead>

 <tbody className="divide-y divide-slate-800">
 {offers.length > 0 ? (
 offers.map((offer) => (
 <motion.tr
 key={offer.id}
 whileHover={{ y: -2, scale: 1.005 }}
 transition={{ duration: 0.15, ease: "easeOut" }}
 className="transition-colors hover:bg-surface-hover/80 cursor-pointer"
 >
 {/* Candidate */}
 <td className="px-6 py-5">
 <div className="font-medium text-text-primary">
 {offer.candidate_name ?? "-"}
 </div>
 </td>

 {/* Position */}
 <td className="px-6 py-5 text-secondary">
 {offer.position_title ?? "-"}
 </td>

 {/* Salary */}
 <td className="px-6 py-5 text-secondary">
 {offer.salary}
 </td>

 {/* Employment */}
 <td className="px-6 py-5">
 <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
 {offer.employment_type}
 </span>
 </td>

 {/* Joining */}
 <td className="px-6 py-5 text-secondary">
 {offer.joining_date}
 </td>

 {/* Expiry */}
 <td className="px-6 py-5 text-secondary">
 {offer.offer_expiry}
 </td>

 {/* Status */}
 <td className="px-6 py-5">
 {offer.status === "Draft" && (
 <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-400">
 Draft
 </span>
 )}
 {offer.status === "Sent" && (
 <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
 Sent
 </span>
 )}
 {offer.status === "Negotiation" && (
 <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-400">
 Negotiation
 </span>
 )}
 {offer.status === "Accepted" && (
 <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
 Accepted
 </span>
 )}
 {offer.status === "Rejected" && (
 <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
 Rejected
 </span>
 )}
 </td>

 {/* Actions */}
 <td className="px-6 py-5">
 <div className="flex items-center justify-center gap-3">
 {offer.status === "Draft" && (
 <button
 onClick={() => onStatusChange(offer.id, "Send")}
 className="rounded-xl bg-primary-soft text-primary border border-primary/20 p-2 transition hover:bg-primary/20 focus-ring"
 title="Send Offer"
 >
 <CheckCircle2 className="h-4 w-4" />
 </button>
 )}
 
 <button
 onClick={() => onView(offer)}
 className="rounded-xl bg-surface-hover border border-border p-2 transition hover:bg-border focus-ring"
 title="View"
 >
 <Eye className="h-4 w-4 text-text-primary" />
 </button>

 <button
 onClick={() => onEdit(offer)}
 className="rounded-xl bg-primary p-2 transition hover:bg-primary-hover active:scale-[0.97] focus-ring"
 title="Edit"
 >
 <Pencil className="h-4 w-4 text-white" />
 </button>

 {offer.status !== "Accepted" && (
 <button
 onClick={() => onStatusChange(offer.id, "Accepted")}
 className="rounded-xl bg-success/10 border border-success/30 text-success p-2 transition hover:bg-success/20 focus-ring"
 title="Mark Accepted"
 >
 <CheckCircle2 className="h-4 w-4" />
 </button>
 )}

 {offer.status !== "Rejected" && (
 <button
 onClick={() => onStatusChange(offer.id, "Rejected")}
 className="rounded-xl bg-warning/10 border border-warning/30 text-warning p-2 transition hover:bg-warning/20 focus-ring"
 title="Mark Rejected"
 >
 <XCircle className="h-4 w-4" />
 </button>
 )}

 <button
 onClick={() => onDelete(offer.id)}
 className="rounded-xl bg-danger/10 border border-danger/30 text-danger p-2 transition hover:bg-danger/20 focus-ring"
 title="Delete"
 >
 <Trash2 className="h-4 w-4" />
 </button>
 </div>
 </td>
 </motion.tr>
 ))
 ) : (
 <tr>
 <td
 colSpan={8}
 className="px-6 py-12 text-center text-muted"
 >
 No offers found.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
}