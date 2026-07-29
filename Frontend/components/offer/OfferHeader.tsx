"use client";

import { RefreshCw } from "lucide-react";

interface Props {
 onRefresh: () => void;
}

export default function OfferHeader({
 onRefresh,
}: Props) {

 return (

 <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

 <div>

 <h1 className="text-3xl font-bold text-text-primary">
 Offer Management
 </h1>

 <p className="mt-1 text-sm text-muted">
 Manage candidate offers, monitor statuses, and track hiring decisions.
 </p>

 </div>

 <div className="flex items-center gap-3">

 <button
 onClick={onRefresh}
 className="
 inline-flex
 items-center
 gap-2
 rounded-2xl
 border
 border-border
 bg-surface
 px-5
 py-3
 text-sm
 font-medium
 text-text-primary
 transition
 hover:bg-secondary-surface
 "
 >
 <RefreshCw className="h-4 w-4" />

 Refresh

 </button>

 </div>

 </div>

 );

}