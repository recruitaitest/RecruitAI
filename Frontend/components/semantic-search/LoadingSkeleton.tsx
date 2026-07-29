export default function LoadingSkeleton() {
    return (
        <div className="space-y-5">

            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-border/[0.06] bg-white/[0.03] p-5"
                >

                    {/* Top Section */}
                    <div className="flex items-start justify-between">

                        <div className="flex gap-4">

                            {/* Avatar */}
                            <div className="h-14 w-14 rounded-full bg-secondary-surface" />

                            <div className="space-y-3 mt-1">
                                <div className="h-4 w-40 rounded bg-secondary-surface" />
                                <div className="h-3 w-28 rounded bg-secondary-surface" />
                            </div>
                        </div>

                        {/* Match Badge */}
                        <div className="h-8 w-24 rounded-full bg-secondary-surface" />
                    </div>

                    {/* Summary */}
                    <div className="mt-6 space-y-2">
                        <div className="h-3 w-full rounded bg-secondary-surface" />
                        <div className="h-3 w-5/6 rounded bg-secondary-surface" />
                    </div>

                    {/* Skills */}
                    <div className="mt-5 flex gap-2">
                        <div className="h-7 w-20 rounded-full bg-secondary-surface" />
                        <div className="h-7 w-24 rounded-full bg-secondary-surface" />
                        <div className="h-7 w-16 rounded-full bg-secondary-surface" />
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-3">
                        <div className="h-10 w-28 rounded-xl bg-secondary-surface" />
                        <div className="h-10 w-28 rounded-xl bg-secondary-surface" />
                    </div>
                </div>
            ))}
        </div>
    );
}