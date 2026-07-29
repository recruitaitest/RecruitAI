"use client";

import { Briefcase } from "lucide-react";

interface SearchBarProps {
    positions: any[];
    selectedPosition: number | null;
    selectedPositionData: any;
    onPositionChange: (positionId: number) => void;
}

export default function SearchBar({
    positions,
    selectedPosition,
    selectedPositionData,
    onPositionChange,
}: SearchBarProps) {

    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />

                <h2 className="text-lg font-semibold">
                    Talent Discovery
                </h2>
            </div>

            <div className="flex flex-col gap-4">

                <label className="text-sm font-medium">
                    Select Position
                </label>

                <select
                    value={selectedPosition ?? ""}
                    onChange={(e) =>
                        onPositionChange(Number(e.target.value))
                    }
                    className="h-14 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none focus-ring focus:border-primary"
                >

                    <option value="">
                        Select a Position
                    </option>

                    {positions.map((position) => (
                        <option
                            key={position.id}
                            value={position.id}
                        >
                            {position.title}
                        </option>
                    ))}
                </select>
                {!!selectedPosition &&
                    selectedPositionData?.required_skills && (
                        <div className="mt-5">

                            <p className="mb-3 text-sm font-medium text-muted-foreground">
                                Required Skills
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {selectedPositionData.required_skills
                                    .split(",")
                                    .map((skill: string) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-ai-accent/30 bg-ai-accent-soft px-3 py-1 text-xs font-medium text-ai-accent"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}
                            </div>

                        </div>
                    )}

            </div>
        </div>
    );
}