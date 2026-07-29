interface ResumePreviewProps {
 candidate?: any;
}

export default function ResumePreview({
 candidate,
}: ResumePreviewProps) {
 return (
 <div className="rounded-2xl border border-border bg-surface p-6 ">

 {/* Header */}
 <div className="flex items-center justify-between mb-5">

 <div>
 <h3 className="text-lg font-semibold">
 Resume Preview
 </h3>

 <p className="text-sm text-muted">
 Embedded resume viewer.
 </p>
 </div>

 <a
 href={`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/candidates/${candidate?.id}/resume`}
 download
 className="rounded-xl border border-border bg-surface px-4 py-2 text-sm hover:bg-secondary-surface transition"
 >
 Download
 </a>
 </div>

 {/* Preview Area */}
 <div className="h-[420px] overflow-hidden rounded-2xl border border-border bg-card p-6">

 {candidate?.resume_path ? (
 <iframe
 src={`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/candidates/${candidate.id}/resume`}
 className="h-full w-full rounded-xl"
 />
 ) : (
 <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border text-muted">
 No Resume Available
 </div>
 )}

 </div>
 </div>
 );
}