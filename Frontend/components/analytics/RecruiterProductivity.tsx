"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Recruiter {
 id?: number;
 name: string;
 candidates: number;
 interviews: number;
 hires: number;
 performance: string;
}

export function RecruiterProductivity() {
 const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 fetch(
 (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000') + "/dashboard/recruiter-productivity"
 )
 .then((res) => {
 if (!res.ok) {
 throw new Error(
 "Failed to fetch recruiter data"
 );
 }
 return res.json();
 })
 .then((data) => {
 setRecruiters(data);
 })
 .catch((error) => {
 console.error(error);
 })
 .finally(() => {
 setLoading(false);
 });
 }, []);

  if (loading) {
  return (
  <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-4">
    <Skeleton className="h-7 w-48 mb-2" />
    <Skeleton className="h-4 w-72 mb-6" />
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      ))}
    </div>
  </div>
  );
  }

 return (
 <div
 className="rounded-[30px] border border-border bg-surface/90 p-6 shadow-soft hover:shadow-elevated transition-shadow duration-base"
 >
 <div className="mb-6">
 <h2 className="text-2xl font-bold text-text-primary">
 Recruiter Productivity
 </h2>

 <p className="text-text-secondary mt-2 text-sm">
 Recruiter hiring performance and activity metrics
 </p>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full border-collapse">
 <thead>
 <tr className="border-b border-border">
 <th className="text-left py-4 px-4 text-text-secondary font-medium text-sm">
 Recruiter
 </th>

 <th className="text-left py-4 px-4 text-text-secondary font-medium text-sm">
 Candidates
 </th>

 <th className="text-left py-4 px-4 text-text-secondary font-medium text-sm">
 Interviews
 </th>

 <th className="text-left py-4 px-4 text-text-secondary font-medium text-sm">
 Hires
 </th>

 <th className="text-left py-4 px-4 text-text-secondary font-medium text-sm">
 Performance
 </th>
 </tr>
 </thead>

 <tbody>
 {recruiters.length > 0 ? (
 recruiters.map(
 (recruiter, index) => (
 <motion.tr
 key={recruiter.id || index}
 tabIndex={0}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 whileHover={{ y: -2, scale: 1.005 }}
 transition={{ duration: 0.15, ease: "easeOut" }}
 className="border-b border-border transition-colors hover:bg-surface-hover hover:shadow-[inset_3px_0_0_0_var(--primary)] focus-ring cursor-pointer group"
 >
 <td className="py-4 px-4">
 <div className="flex items-center gap-3">
 <div
 className="
 w-10
 h-10
 rounded-full
 bg-primary/20
 flex
 items-center
 justify-center
 text-primary
 font-semibold
 "
 >
 {recruiter.name?.charAt(
 0
 )}
 </div>

 <span className="text-text-primary font-medium">
 {
 recruiter.name
 }
 </span>
 </div>
 </td>

 <td className="py-4 px-4 text-text-secondary">
 {
 recruiter.candidates
 }
 </td>

 <td className="py-4 px-4 text-text-secondary">
 {
 recruiter.interviews
 }
 </td>

 <td className="py-4 px-4 text-text-secondary">
 {recruiter.hires}
 </td>

 <td className="py-4 px-4">
 <span
 className="
 rounded-full
 bg-success/15
 px-3
 py-1
 text-sm
 font-semibold
 text-success
 "
 >
 {
 recruiter.performance
 }
 </span>
 </td>
 </motion.tr>
 )
 )
 ) : (
 <tr>
  <td
  colSpan={5}
  className="py-10 text-center"
  >
  <div className="flex flex-col items-center justify-center py-6 px-4 border border-dashed border-border rounded-xl max-w-sm mx-auto">
    <p className="text-text-secondary font-medium mb-1">No recruiter data found</p>
    <p className="text-xs text-muted">Activity and performance metrics will populate here.</p>
  </div>
  </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
}