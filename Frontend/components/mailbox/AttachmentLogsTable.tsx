"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMailboxAttachments } from "@/services/mailboxService";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

import {
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  AlertTriangle,
  ArrowUpRight,
  X,
} from "lucide-react";

interface AttachmentLog {
  id: number;
  message_id: number;
  filename: string;
  content_type: string;
  file_size: number;
  parsed: boolean;
  sender: string;
  subject: string;
  received_at: string;
  candidate_id: number | null;
}

const LIMIT = 5;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderParsingStatus(parsed: boolean) {
  return parsed ? (
    <span className="flex w-fit items-center gap-1.5 rounded-lg bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Parsed
    </span>
  ) : (
    <span className="flex w-fit items-center gap-1.5 rounded-lg bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </span>
  );
}

/* ── shared rows ── */
function AttachmentRows({
  logs,
  onViewCandidate,
}: {
  logs: AttachmentLog[];
  onViewCandidate: (id: number) => void;
}) {
  if (logs.length === 0)
    return (
      <p className="px-6 py-10 text-center text-sm text-text-secondary">
        No resume attachments processed yet.
      </p>
    );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-secondary-surface">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Filename
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Subject
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Sender
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Received
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Size
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Parsing
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
              Candidate
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <motion.tr
              key={log.id}
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="border-t border-border hover:bg-secondary-surface transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium text-text-primary">
                    {log.filename}
                  </p>
                </div>
              </td>
              <td className="max-w-[200px] truncate px-6 py-4 text-sm text-text-secondary">
                {log.subject || "—"}
              </td>
              <td className="max-w-[200px] truncate px-6 py-4 text-sm text-text-secondary">
                {log.sender}
              </td>
              <td className="px-6 py-4 text-sm text-text-secondary">
                {formatDateTime(log.received_at)}
              </td>
              <td className="px-6 py-4 text-sm text-text-secondary">
                {formatFileSize(log.file_size)}
              </td>
              <td className="px-6 py-4">
                {renderParsingStatus(log.parsed)}
              </td>
              <td className="px-6 py-4">
                {log.candidate_id ? (
                  <button
                    onClick={() => onViewCandidate(log.candidate_id!)}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition"
                  >
                    View <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <span className="text-sm text-gray-500">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AttachmentLogsTable() {
  const router = useRouter();
  const [logs, setLogs] = useState<AttachmentLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  // Lock background scroll when modal is open
  useBodyScrollLock(viewAll);

  useEffect(() => {
    async function loadAttachments() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMailboxAttachments();
        setLogs(data.attachments);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Failed to load attachments"
        );
      } finally {
        setLoading(false);
      }
    }
    loadAttachments();
  }, []);

  function goToCandidate(id: number) {
    router.push(`/candidates/${id}`);
  }

  const visible = logs.slice(0, LIMIT);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-2xl border border-border bg-secondary-surface shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Resume Processing Logs
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Track resume attachments and AI parsing into candidate records.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <FileText className="h-4 w-4" />
            AI Resume Parsing
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-text-secondary">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading attachments...</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center gap-3 px-6 py-6 text-sm text-red-300">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            {error}
          </div>
        )}

        {/* Table — limited to 5 */}
        {!loading && !error && (
          <AttachmentRows logs={visible} onViewCandidate={goToCandidate} />
        )}

        {/* Footer */}
        {logs.length > LIMIT && (
          <div className="flex items-center justify-between border-t border-border px-6 py-3 bg-white/[0.02]">
            <span className="text-xs text-gray-500">
              Showing {LIMIT} of {logs.length}
            </span>
            <button
              onClick={() => setViewAll(true)}
              className="text-xs font-semibold text-primary hover:text-primary-hover transition"
            >
              View All →
            </button>
          </div>
        )}
      </motion.div>

      {/* View All Modal */}
      <AnimatePresence>
        {viewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setViewAll(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    All Resume Processing Logs
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {logs.length} attachments
                  </p>
                </div>
                <button
                  onClick={() => setViewAll(false)}
                  className="rounded-xl p-2 hover:bg-secondary-surface transition"
                >
                  <X className="h-5 w-5 text-muted" />
                </button>
              </div>
              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1">
                <AttachmentRows logs={logs} onViewCandidate={goToCandidate} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}