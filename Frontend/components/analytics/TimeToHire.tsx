"use client";

import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import { getTimeToHire } from "@/services/analyticsService";

export function TimeToHire() {
 const [hiringTimeData, setHiringTimeData] = useState<any[]>([]);

 useEffect(() => {
 getTimeToHire().then(data => {
 setHiringTimeData(data);
 }).catch(err => console.error(err));
 }, []);

 return (
 <div
 className="
 rounded-[30px]
 border
 border-border
 bg-surface/90
 
 p-5
 shadow-md dark:shadow-2xl
 "
 >

 {/* Header */}
 <div className="mb-5">

 <h2 className="text-2xl font-bold text-text-primary">
 Time to Hire
 </h2>

 <p className="text-text-secondary mt-2 text-sm">
 Average hiring duration by job role
 </p>

 </div>

 {/* Chart */}
 <div className="h-[280px]">

 <ResponsiveContainer width="100%" height="100%">

 <BarChart
 data={hiringTimeData}
 barCategoryGap={18}
 barSize={55}
 >

 {/* Grid */}
 <CartesianGrid
 strokeDasharray="3 3"
 stroke="rgba(255,255,255,0.08)"
 vertical={false}
 />

 {/* X Axis */}
 <XAxis
 dataKey="role"
 stroke="#9CA3AF"
 tickLine={false}
 axisLine={false}
 fontSize={12}
 />

 {/* Y Axis */}
 <YAxis
 stroke="#9CA3AF"
 tickLine={false}
 axisLine={false}
 fontSize={12}
 />

 {/* Tooltip */}
 <Tooltip
 contentStyle={{
 background: "#0F172A",
 border: "1px solid rgba(255,255,255,0.1)",
 borderRadius: "12px",
 color: "#fff",
 }}
 cursor={{
 fill: "rgba(255,255,255,0.04)",
 }}
 />

 {/* Bars */}
 <Bar
 dataKey="days"
 radius={[8, 8, 0, 0]}
 fill="var(--warning)"
 />

 </BarChart>

 </ResponsiveContainer>

 </div>

 </div>
 );
}