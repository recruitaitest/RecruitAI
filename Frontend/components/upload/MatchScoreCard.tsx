interface MatchScoreCardProps {
 candidate?: any;
}

export default function MatchScoreCard({
 candidate,
}: MatchScoreCardProps) {
 return (
 <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-surface to-surface-hover p-6 text-center shadow-xl">

 {/* Header */}
 <p className="text-xs uppercase tracking-widest text-muted mb-3">
 Match Score
 </p>

 {/* Score */}
 <div className="text-6xl font-bold text-indigo-400">
 95%
 </div>

 {/* Status */}
 <p className="mt-3 text-sm text-emerald-400">
 Strong Match
 </p>

 {/* Progress */}
 <div className="mt-6 h-2 w-full rounded-full bg-secondary-surface overflow-hidden">

 <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />

 </div>

 {/* Footer */}
 <div className="mt-4 flex items-center justify-center gap-2">

 <span className="h-2 w-2 rounded-full bg-emerald-400" />

 <p className="text-xs text-muted">
 AI relevance evaluation completed
 </p>

 </div>
 </div>
 );
}