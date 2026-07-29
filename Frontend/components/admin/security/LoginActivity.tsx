"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getLoginActivity } from "@/services/adminService";

export default function LoginActivity() {
 const [activities, setActivities] = useState<any[]>([]);
 const [showModal, setShowModal] = useState(false);

 useEffect(() => {
 fetchLoginActivity();
 }, []);

 const fetchLoginActivity = async () => {
 try {
 const data = await getLoginActivity();
 setActivities(data);
 } catch (error) {
 console.error(error);
 }
 };

 const visibleActivities = activities.slice(0, 4);
 const hasMore = activities.length > 4;

 const ActivityCard = ({ activity }: { activity: any }) => (
 <div className="rounded-lg border border-border p-3">
 <p className="text-text-primary font-medium">{activity.user_email}</p>
 <p className="text-muted text-sm">{activity.role}</p>
 <p className="text-muted text-xs">
 {new Date(activity.login_time).toLocaleString()}
 </p>
 <p
 className={`text-xs font-medium mt-1 ${
 activity.status === "SUCCESS"
 ? "text-green-400"
 : activity.status === "MFA_PENDING"
 ? "text-yellow-400"
 : "text-red-400"
 }`}
 >
 {activity.status}
 </p>
 </div>
 );

 return (
 <>
 <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
 {/* Header */}
 <div className="mb-6">
 <h3 className="text-xl font-semibold text-text-primary">
 Recent Login Activity
 </h3>
 <p className="mt-1 text-sm text-muted">
 Monitor recruiter and admin login sessions
 </p>
 </div>

 {/* Activity List — only 4 */}
 <div className="space-y-4">
 {activities.length === 0 ? (
 <p className="text-sm text-muted">No login activity found.</p>
 ) : (
 visibleActivities.map((activity: any) => (
 <ActivityCard key={activity.login_time} activity={activity} />
 ))
 )}
 </div>

 {/* Show More Button */}
 {hasMore && (
 <button
 onClick={() => setShowModal(true)}
 className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm text-muted transition hover:border-blue-500 hover:text-blue-400"
 >
 Show More ({activities.length - 4} more)
 </button>
 )}
 </div>

 {/* Modal */}
 {showModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
 <div className="relative w-full max-w-lg max-h-[80vh] rounded-2xl border border-border bg-background shadow-2xl flex flex-col">
 {/* Modal Header */}
 <div className="flex items-center justify-between border-b border-border px-6 py-4">
 <div>
 <h3 className="text-lg font-semibold text-text-primary">
 All Login Activity
 </h3>
 <p className="text-xs text-muted mt-0.5">
 {activities.length} total records
 </p>
 </div>
 <button
 onClick={() => setShowModal(false)}
 className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition hover:border-slate-500 hover:text-text-primary"
 >
 <X className="h-4 w-4" />
 </button>
 </div>

 {/* Modal Body — scrollable */}
 <div className="overflow-y-auto p-6 space-y-3">
 {activities.map((activity: any) => (
 <ActivityCard key={activity.login_time} activity={activity} />
 ))}
 </div>
 </div>
 </div>
 )}
 </>
 );
}