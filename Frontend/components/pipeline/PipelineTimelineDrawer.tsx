"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getPipelineHistory } from "@/services/pipelineService";

interface Props {
    open: boolean;
    pipelineId: string | null;
    onClose: () => void;
}

export default function PipelineTimelineDrawer({
    open,
    pipelineId,
    onClose,
}: Props) {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open || !pipelineId) return;

        const loadHistory = async () => {
            setLoading(true);

            try {
                const data = await getPipelineHistory(
                    Number(pipelineId)
                );

                setHistory(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [open, pipelineId]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
            <div className="h-full w-[420px] bg-surface border-l border-border p-6 overflow-y-auto">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-text-primary">
                        Candidate Timeline
                    </h2>

                    <button onClick={onClose}>
                        <X className="h-5 w-5 text-text-secondary" />
                    </button>
                </div>

                {loading ? (
                    <p className="text-text-secondary">
                        Loading...
                    </p>
                ) : (
                    <div className="space-y-5">
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className="border-l-2 border-primary pl-4"
                            >
                                <p className="font-medium text-text-primary">
                                    {item.new_stage}
                                </p>

                                <p className="text-xs text-text-secondary">
                                    {new Date(
                                        item.changed_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}