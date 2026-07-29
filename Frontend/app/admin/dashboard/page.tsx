"use client";

import { motion } from "framer-motion";
import AdminStats from "@/components/admin/dashboard/AdminStats";
import RecentActivities from "@/components/admin/dashboard/RecentActivities";
import SystemOverview from "@/components/admin/dashboard/SystemOverview";
import QuickActions from "@/components/admin/dashboard/QuickActions";

export default function AdminDashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Statistics */}
      <motion.div variants={itemVariants}>
        <AdminStats />
      </motion.div>

      {/* Main Grid */}
      <motion.div variants={itemVariants} className="grid gap-6 xl:grid-cols-2">
        <RecentActivities />
        <SystemOverview />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>
    </motion.div>
  );
}