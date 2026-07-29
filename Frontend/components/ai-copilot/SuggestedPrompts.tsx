"use client";

const prompts = [
 {
 id: 1,
 text: "Find React developers with 3+ years experience",
 },

 {
 id: 2,
 text: "Summarize this candidate profile",
 },

 {
 id: 3,
 text: "Match candidates for Frontend Engineer role",
 },

 {
 id: 4,
 text: "Generate interview questions",
 },
];

interface SuggestedPromptsProps {
 onPromptClick: (prompt: string) => void;
}

export default function SuggestedPrompts({
 onPromptClick,
}: SuggestedPromptsProps) {
 return (
 <div className="p-2 w-full overflow-x-auto no-scrollbar">
 <div className="flex gap-2 pb-2">
 {prompts.map((prompt, index) => (
 <button
 key={index}
 className="whitespace-nowrap rounded-xl border border-border dark:border-border bg-slate-50 dark:bg-surface px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-secondary transition hover:bg-slate-100 dark:hover:bg-secondary-surface"
 onClick={() => onPromptClick(prompt.text)}
 >
 {prompt.text}
 </button>
 ))}
 </div>
 </div>
 );
}