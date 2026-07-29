"use client";

export default function MailboxSkeleton() {
 return (
 <div className="space-y-8 animate-pulse">

 {/* Header Skeleton */}
 <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

 <div className="space-y-3">
 <div className="h-8 w-64 rounded-lg bg-secondary-surface" />

 <div className="h-4 w-96 rounded-lg bg-secondary-surface" />
 </div>

 <div className="h-12 w-44 rounded-xl bg-blue-500/20" />
 </div>

 {/* Stats Skeleton */}
 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
 {Array.from({ length: 4 }).map((_, index) => (
 <div
 key={index}
 className="
 rounded-2xl
 border border-border
 bg-secondary-surface
 p-5
 "
 >
 <div className="flex items-start justify-between">
 <div className="space-y-3">
 <div className="h-4 w-28 rounded bg-secondary-surface" />

 <div className="h-10 w-20 rounded bg-secondary-surface" />

 <div className="h-4 w-40 rounded bg-secondary-surface" />
 </div>

 <div className="h-12 w-12 rounded-xl bg-secondary-surface" />
 </div>
 </div>
 ))}
 </div>

 {/* Table Skeleton */}
 <div
 className="
 overflow-hidden
 rounded-2xl
 border border-border
 bg-secondary-surface
 "
 >
 {/* Header */}
 <div className="border-b border-border px-6 py-5">
 <div className="h-6 w-52 rounded bg-secondary-surface" />

 <div className="mt-3 h-4 w-80 rounded bg-secondary-surface" />
 </div>

 {/* Rows */}
 <div className="space-y-4 p-6">
 {Array.from({ length: 5 }).map((_, index) => (
 <div
 key={index}
 className="
 flex items-center justify-between
 rounded-xl
 border border-border
 bg-white/[0.02]
 px-4 py-5
 "
 >
 <div className="space-y-3">
 <div className="h-4 w-48 rounded bg-secondary-surface" />

 <div className="h-3 w-32 rounded bg-secondary-surface" />
 </div>

 <div className="h-10 w-24 rounded-lg bg-secondary-surface" />
 </div>
 ))}
 </div>
 </div>

 </div>
 );
}