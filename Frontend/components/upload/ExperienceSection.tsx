interface ExperienceSectionProps {
 candidate?: any;
}

export default function ExperienceSection({
 candidate,
}: ExperienceSectionProps) {

 if (!candidate) {
 return (
 <div className="rounded-2xl border border-border bg-surface p-6">
 <h3 className="text-lg font-semibold">
 Experience
 </h3>

 <p className="text-muted mt-4">
 No candidate selected
 </p>
 </div>
 );
 }

 return (
 <div className="rounded-2xl border border-border bg-surface p-6">

 <h3 className="text-lg font-semibold mb-4">
 Experience
 </h3>

 <div className="rounded-2xl border border-border bg-card p-4">

 <p className="text-sm text-muted mb-1">
 Total Experience
 </p>

 <p className="text-xl font-semibold">
 {candidate.experience || 0} Years
 </p>

 </div>

 </div>
 );
}