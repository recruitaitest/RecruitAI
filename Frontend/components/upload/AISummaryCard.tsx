interface AISummaryCardProps {
 candidate?: any;
}

export default function AISummaryCard({
 candidate,
}: AISummaryCardProps) {

 const summary = candidate
 ? `${candidate.full_name} has ${
 candidate.experience || 0
 } years of experience and possesses skills in ${
 candidate.skills || "various technologies"
 }.`
 : "Upload a resume or select a candidate to view the AI-generated summary.";

 return (
 <div className="w-full rounded-2xl border border-border bg-surface p-6">

 {/* Header */}
 <div className="mb-4">

 <p className="text-xs uppercase tracking-widest text-indigo-300">
 AI Summary
 </p>

 </div>

 {/* Summary */}
 <p className="text-sm leading-7 text-secondary">
 {summary}
 </p>

 {/* Footer */}
 <div className="mt-6 flex items-center gap-2">

 <span className="h-2 w-2 rounded-full bg-emerald-400" />

 <p className="text-xs text-muted">
 AI-generated candidate summary
 </p>

 </div>

 </div>
 );
}