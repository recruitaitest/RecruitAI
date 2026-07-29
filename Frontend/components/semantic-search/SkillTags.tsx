interface SkillTagsProps {
    skills: string[];
}

export default function SkillTags({
    skills = [],
}: SkillTagsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
                <span
                    key={skill}
                    className="rounded-full border border-border bg-surface-hover px-3 py-1 text-xs font-medium text-text-secondary transition-colors"
                >
                    {skill}
                </span>
            ))}
        </div>
    );
}