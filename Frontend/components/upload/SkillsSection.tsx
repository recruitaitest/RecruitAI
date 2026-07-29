interface SkillsSectionProps {
 candidate?: any;
}

export default function SkillsSection({
 candidate,
}: SkillsSectionProps) {

 const skills = Array.isArray(candidate?.skills)
 ? candidate.skills
 : typeof candidate?.skills === "string"
 ? candidate.skills
 .split(",")
 .map((skill: string) => skill.trim())
 .filter(Boolean)
 : [];
 return (
 <div className="rounded-2xl border border-border bg-surface p-6">

 <h3 className="text-xl font-semibold">
 Extracted Skills
 </h3>

 <p className="text-sm text-muted mt-1">
 AI-detected candidate skills and technologies.
 </p>

 {!skills.length ? (
 <p className="text-muted mt-4">
 No skills found
 </p>
 ) : (
 <div className="flex flex-wrap gap-3 mt-5">

 {skills.map((skill: string) => (
 <span
 key={skill}
 className="rounded-full bg-violet-100 dark:bg-violet-100/10 px-4 py-2 text-sm text-violet-700 dark:text-violet-300 font-medium"
 >
 {skill}
 </span>
 ))}

 </div>
 )}

 </div>
 );
}