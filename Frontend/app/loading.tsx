export default function Loading() {
 return (
 <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-surface/80 backdrop-blur-sm">
 <div className="relative flex items-center justify-center">
 <div className="absolute h-16 w-16 rounded-full border-4 border-blue-500/20"></div>
 <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500"></div>
 </div>
 <p className="mt-4 text-sm font-medium text-secondary animate-pulse">Loading, please wait...</p>
 </div>
 );
}
