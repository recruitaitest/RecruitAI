"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AdminCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  description?: string;
}

export default function AdminCard({
  title,
  value,
  icon,
  description,
}: AdminCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-border bg-surface p-5 shadow-soft hover:shadow-elevated hover:border-primary/40 transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-muted">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-muted">
              {description}
            </p>
          )}
        </div>

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}