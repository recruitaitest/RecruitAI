"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Applicant {
  id: string;
  name: string;
  position: string;
  email: string;
  experience: string;
  rating: number;
  status: "screening" | "interview" | "offer" | "rejected";
  appliedDate: string;
}

interface RecentApplicantsProps {
  applicants?: Applicant[];
  isLoading?: boolean;
  itemVariants?: any;
}

export function RecentApplicants({
  applicants,
  isLoading,
  itemVariants,
}: RecentApplicantsProps) {
  const data = applicants || [];
  const router = useRouter();

  const defaultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const item = itemVariants || defaultItemVariants;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interview":
        return "bg-primary/10 text-primary border border-primary/20";
      case "offer":
        return "bg-success/10 text-success border border-success/20";
      case "screening":
        return "bg-warning/10 text-warning border border-warning/20";
      case "rejected":
        return "bg-danger/10 text-danger border border-danger/20";
      default:
        return "bg-surface-hover text-text-secondary";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.7) return "text-green-400";
    if (rating >= 4.5) return "text-primary";
    return "text-amber-400";
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-card border-border shadow-soft p-6 rounded-xl border hover:shadow-elevated transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Applicants</h3>
        <button
          onClick={() => router.push("candidates")}
          className="text-sm text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3 py-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border rounded-xl">
          <div className="w-12 h-12 bg-surface-hover rounded-full flex items-center justify-center mb-3">
            <ChevronRight className="w-6 h-6 text-text-secondary opacity-50" />
          </div>
          <p className="text-text-secondary font-medium mb-1">No recent applicants</p>
          <p className="text-sm text-muted mb-4">Your candidate pipeline is currently clear.</p>
          <button
            onClick={() => router.push("candidates")}
            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            View candidate database
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">Position</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">Experience</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">Applied</th>
              </tr>
            </thead>
            <tbody>
              {data.map((applicant) => (
                <motion.tr
                  key={applicant.id}
                  whileHover={{ y: -2, scale: 1.005 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  tabIndex={0}
                  onClick={() => router.push(`candidates/${applicant.id}`)}
                  className="group border-b border-border transition-colors hover:bg-surface-hover hover:shadow-[inset_3px_0_0_0_var(--primary)] focus-ring cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{applicant.name}</p>
                      <p className="text-xs text-text-secondary">{applicant.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{applicant.position}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{applicant.experience}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${getRatingColor(applicant.rating)}`}>
                      ★ {applicant.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(applicant.status)}`}>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary relative">
                    <div className="flex items-center justify-between">
                      <span>{applicant.appliedDate}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-base ease-standard group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default RecentApplicants;
