"use client";

import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import UsersTable from "@/components/admin/users/UsersTable";

export default function UsersPage() {
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Users Management
          </h2>

          <p className="mt-2 text-muted">
            Manage recruiters, admins, and user access.
          </p>
        </div>

        {/* Users Table */}
        <UsersTable />
      </motion.div>
    </AdminLayout>
  );
}