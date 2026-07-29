"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MailboxStatsCardProps {
 title: string;
 value: string | number;
 icon: LucideIcon;
 description: string;
 isSyncing?: boolean;
}

export default function MailboxStatsCard({
 title,
 value,
 icon: Icon,
 description,
 isSyncing = false,
}: MailboxStatsCardProps) {
  const getIconStyle = () => {
    const t = title.toLowerCase();
    if (t.includes('failed')) return 'bg-danger/10 text-danger border border-danger/20';
    if (t.includes('pending')) return 'bg-warning/10 text-warning border border-warning/20';
    if (t.includes('processed')) return 'bg-success/10 text-success border border-success/20';
    return 'bg-primary-soft text-primary border border-primary/20';
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-soft hover:shadow-elevated hover:border-primary/40 transition-shadow duration-300"
    >
      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-text-primary">
            {value}
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            {description}
          </p>
        </div>

        <div className="relative">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-base group-hover:scale-105 ${getIconStyle()}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          {isSyncing && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}