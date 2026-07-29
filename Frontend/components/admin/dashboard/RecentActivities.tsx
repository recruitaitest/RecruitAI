"use client";

import { useEffect, useState } from "react";
import { UserPlus, ShieldCheck, Mail, Trash2, Activity, Settings } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";

type AuditLog = {
  id: number;
  user_email: string;
  action: string;
  entity: string;
  description: string;
  created_at: string;
};

export default function RecentActivities() {
  const [activities, setActivities] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get("/admin/audit-logs");
        setActivities(response.data.slice(0, 4)); // Only show top 4
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getIcon = (action: string, entity: string) => {
    const a = action.toUpperCase();
    const e = entity.toUpperCase();
    
    if (e.includes("USER") || e.includes("RECRUITER")) return <UserPlus className="h-5 w-5 text-blue-400" />;
    if (e.includes("ROLE") || e.includes("PERMISSION")) return <ShieldCheck className="h-5 w-5 text-green-400" />;
    if (e.includes("MAIL") || e.includes("SYNC")) return <Mail className="h-5 w-5 text-yellow-400" />;
    if (a === "DELETE") return <Trash2 className="h-5 w-5 text-red-400" />;
    if (e.includes("SETTING")) return <Settings className="h-5 w-5 text-orange-400" />;
    return <Activity className="h-5 w-5 text-violet-400" />;
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-text-primary">Recent Activities</h3>
        <p className="mt-1 text-sm text-muted">Monitor recent admin operations and updates</p>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-sm text-muted py-4 text-center">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="text-sm text-muted py-4 text-center">No recent activities found.</div>
        ) : (
          activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-secondary-surface p-4 hover:border-primary/40 hover:bg-surface-hover cursor-pointer"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface">
                {getIcon(activity.action, activity.entity)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {activity.action} {activity.entity}
                  </h4>
                  <span className="text-xs text-muted whitespace-nowrap">
                    {getTimeAgo(activity.created_at)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted truncate">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}