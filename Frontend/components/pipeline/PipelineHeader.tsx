"use client";

import { Search, Plus, Filter } from "lucide-react";

interface PipelineHeaderProps {
 searchQuery: string;
 setSearchQuery: (value: string) => void;
 onAddCandidate: () => void;
 totalCandidates: number;
 activeCandidates: number;
}

export default function PipelineHeader({
 searchQuery,
 setSearchQuery,
 onAddCandidate,
 totalCandidates,
 activeCandidates,
}: PipelineHeaderProps) {
 return (
 <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
 {/* Left Section */}
 <div>
 <h1 className="text-3xl font-bold tracking-tight text-text-primary">
 Recruitment Pipeline
 </h1>

 <p className="mt-1 text-sm text-text-secondary">
 Manage and track candidates across hiring stages.
 </p>
 <div className="mt-3 flex flex-wrap gap-3 text-xs">
 <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary">
 {activeCandidates} Active
 </span>
 <span className="rounded-full border border-border bg-surface px-3 py-1 font-medium text-secondary">
 {totalCandidates} Total Records
 </span>
 </div>
 </div>

 {/* Right Section */}
 <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
 {/* Search */}
 <div className="relative">
 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />

 <input
 type="text"
 placeholder="Search candidates..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="
 h-11
 w-full
 rounded-xl
 border
 border-gray-800
 bg-card
 pl-10
 pr-4
 text-sm
 text-text-primary
 outline-none
 transition-all
 focus-ring focus:border-primary
 sm:w-[280px]
 "
 />
 </div>

 {/* Filter Button */}
 <button
 className="
 flex
 h-11
 items-center
 gap-2
 rounded-xl
 border
 border-gray-800
 bg-card
 px-4
 text-sm
 font-medium
 text-text-secondary
 transition-all
 hover:bg-surface-hover
 "
 >
 <Filter className="h-4 w-4" />
 Filters
 </button>

 {/* Add Candidate */}
 <button
 onClick={onAddCandidate}
 className="
 flex
 h-11
 items-center
 gap-2
 rounded-xl
 bg-primary
 px-5
 text-sm
 font-medium
 text-white
 transition bg-primary text-white hover:bg-primary-hover active:scale-[0.97] focus-ring
 "
 >
 <Plus className="h-4 w-4" />
 Add Candidate
 </button>
 </div>
 </div>
 );
}
