import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddNoteModalProps {
 open: boolean;
 onClose: () => void;
 candidateName: string;
 onSubmit: (note: string) => Promise<void>;
}

export default function AddNoteModal({
 open,
 onClose,
 candidateName,
 onSubmit,
}: AddNoteModalProps) {
 const [note, setNote] = useState("");
 const [loading, setLoading] = useState(false);

 if (!open) return null;

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!note.trim()) return;
 setLoading(true);
 try {
 await onSubmit(note);
 setNote("");
 onClose();
 } finally {
 setLoading(false);
 }
 };

 return (
 <AnimatePresence>
 {open && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
 >
 <div className="flex items-center justify-between border-b border-border pb-4">
 <h3 className="text-lg font-semibold text-text-primary">
 Add Note for {candidateName}
 </h3>
 <button
 onClick={onClose}
 className="rounded-lg p-2 text-text-secondary transition hover:bg-secondary-surface hover:text-text-primary"
 >
 <X className="h-5 w-5" />
 </button>
 </div>
 <form onSubmit={handleSubmit} className="mt-4 space-y-4">
 <div>
 <label className="mb-2 block text-sm font-medium text-text-secondary">
 Note Content
 </label>
 <textarea
 value={note}
 onChange={(e) => setNote(e.target.value)}
 placeholder="Enter your note here..."
 className="h-32 w-full rounded-xl border border-border bg-surface p-3 text-sm text-text-primary placeholder:text-muted focus-ring focus:border-primary"
 required
 />
 </div>
 <div className="flex justify-end gap-3 pt-2">
 <button
 type="button"
 onClick={onClose}
 className="rounded-xl px-4 py-2 text-sm font-medium text-text-secondary hover:bg-secondary-surface"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={loading || !note.trim()}
 className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover active:scale-[0.97] focus-ring disabled:opacity-50"
 >
 {loading ? "Saving..." : "Submit Note"}
 </button>
 </div>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 );
}
