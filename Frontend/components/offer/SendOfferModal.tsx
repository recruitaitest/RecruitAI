"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, File, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SendOfferModalProps {
 open: boolean;
 onClose: () => void;
 offerId?: number;
 onOfferSent: () => void;
}

export default function SendOfferModal({
 open,
 onClose,
 offerId,
 onOfferSent,
}: SendOfferModalProps) {
 const [file, setFile] = useState<File | null>(null);
 const [isSending, setIsSending] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
 if (!open) {
 setFile(null);
 setIsSending(false);
 }
 }, [open]);

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files && e.target.files[0]) {
 const selected = e.target.files[0];
 if (selected.type !== "application/pdf") {
 toast.error("Please upload a PDF file.");
 return;
 }
 setFile(selected);
 }
 };

 const handleSend = async () => {
 if (!file || !offerId) return;

 setIsSending(true);
 const formData = new FormData();
 formData.append("file", file);

 try {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/offers/${offerId}/upload-letter`, {
 method: "POST",
 body: formData,
 });

 if (!res.ok) {
 throw new Error("Failed to send offer");
 }

 toast.success("Offer letter uploaded and sent to candidate!");
 onOfferSent();
 onClose();
 } catch (error) {
 console.error(error);
 toast.error("An error occurred while sending the offer.");
 } finally {
 setIsSending(false);
 }
 };

 return (
 <AnimatePresence>
 {open && (
 <>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={!isSending ? onClose : undefined}
 className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
 />

 <motion.div
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 20 }}
 className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card shadow-2xl"
 >
 <div className="flex items-center justify-between border-b border-border px-6 py-5">
 <h2 className="text-xl font-semibold text-text-primary">
 Send Offer Letter
 </h2>
 <button
 onClick={onClose}
 disabled={isSending}
 className="rounded-xl p-2 text-muted hover:bg-secondary-surface hover:text-text-primary transition disabled:opacity-50"
 >
 <X className="h-5 w-5" />
 </button>
 </div>

 <div className="p-6">
 <div className="mb-4 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft p-4 text-primary">
 <AlertCircle className="h-5 w-5 shrink-0" />
 <p className="text-sm leading-relaxed">
 Please upload the signed offer letter as a PDF. Once uploaded, an email will be automatically sent to the candidate with the attachment, and the offer status will be updated to &quot;Sent&quot;.
 </p>
 </div>

 <div 
 onClick={() => !isSending && fileInputRef.current?.click()}
 className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition ${
 file 
 ? "border-primary bg-primary/5" 
 : "border-border bg-secondary-surface/50 hover:border-slate-500 hover:bg-secondary-surface"
 } ${isSending ? "opacity-50 pointer-events-none" : ""}`}
 >
 <input
 type="file"
 ref={fileInputRef}
 onChange={handleFileChange}
 accept="application/pdf"
 className="hidden"
 />
 {file ? (
 <>
 <div className="rounded-full bg-primary-soft p-3 text-primary mb-3">
 <File className="h-8 w-8" />
 </div>
 <p className="text-sm font-medium text-primary text-center truncate w-full px-4">
 {file.name}
 </p>
 <p className="text-xs text-muted mt-1">
 Click to replace
 </p>
 </>
 ) : (
 <>
 <div className="rounded-full bg-slate-700 p-3 text-secondary mb-3">
 <UploadCloud className="h-8 w-8" />
 </div>
 <p className="text-sm font-medium text-primary">
 Click to upload PDF
 </p>
 <p className="text-xs text-muted mt-1">
 Max file size 5MB
 </p>
 </>
 )}
 </div>
 </div>

 <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-5">
 <button
 onClick={onClose}
 disabled={isSending}
 className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-secondary hover:bg-secondary-surface transition disabled:opacity-50"
 >
 Cancel
 </button>
 <button
 onClick={handleSend}
 disabled={!file || isSending}
 className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover active:scale-[0.97] focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isSending && <Loader2 className="h-4 w-4 animate-spin" />}
 Send Offer
 </button>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}
