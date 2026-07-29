"use client";

import { motion } from "framer-motion";
import {
 useEffect,
 useState,
} from "react";

import {
 getAuditLogs,
} from "@/services/adminService";

export default function AuditLogsTable() {

 const [search, setSearch] =
 useState("");

 const [actionFilter, setActionFilter] =
 useState("ALL");

 const [entityFilter, setEntityFilter] =
 useState("ALL");

 const [logs, setLogs] = useState<any[]>([]);

 useEffect(() => {
 fetchLogs();
 }, []);

 const fetchLogs =
 async () => {

 try {

 const data =
 await getAuditLogs();

 setLogs(data);

 } catch (error) {
 console.error(error);
 }
 };

 const filteredLogs = logs.filter(
 (log: any) => {

 const matchesSearch =
 log.user_email
 ?.toLowerCase()
 .includes(
 search.toLowerCase()
 ) ||
 log.description
 ?.toLowerCase()
 .includes(
 search.toLowerCase()
 );

 const matchesAction =
 actionFilter === "ALL" ||
 log.action === actionFilter;

 const matchesEntity =
 entityFilter === "ALL" ||
 log.entity === entityFilter;

 return (
 matchesSearch &&
 matchesAction &&
 matchesEntity
 );
 }
 );

 return (
 <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-lg">

 <div className="border-b border-border px-6 py-5">
 <h3 className="text-xl font-semibold text-text-primary">
 Audit Logs
 </h3>

 <p className="mt-1 text-sm text-muted">
 Track administrative actions across the platform
 </p>
 </div>
 <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row">

 <input
 type="text"
 placeholder="Search logs..."
 value={search}
 onChange={(e) =>
 setSearch(
 e.target.value
 )
 }
 className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-text-primary"
 />

 <select
 value={actionFilter}
 onChange={(e) =>
 setActionFilter(
 e.target.value
 )
 }
 className="rounded-xl border border-border bg-surface px-4 py-3 text-text-primary"
 >
 <option value="ALL">
 All Actions
 </option>

 <option value="CREATE">
 Create
 </option>

 <option value="UPDATE">
 Update
 </option>

 <option value="DELETE">
 Delete
 </option>
 </select>

 <select
 value={entityFilter}
 onChange={(e) =>
 setEntityFilter(
 e.target.value
 )
 }
 className="rounded-xl border border-border bg-surface px-4 py-3 text-text-primary"
 >
 <option value="ALL">
 All Entities
 </option>

 <option value="USER">
 User
 </option>

 <option value="ROLE">
 Role
 </option>

 <option value="SETTINGS">
 Settings
 </option>

 <option value="AI_SETTINGS">
 AI Settings
 </option>
 </select>

 </div>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="border-b border-border bg-surface">
 <tr>
 <th className="px-6 py-4 text-left text-muted">
 User
 </th>

 <th className="px-6 py-4 text-left text-muted">
 Action
 </th>

 <th className="px-6 py-4 text-left text-muted">
 Entity
 </th>

 <th className="px-6 py-4 text-left text-muted">
 Description
 </th>

 <th className="px-6 py-4 text-left text-muted">
 Time
 </th>
 </tr>
 </thead>

 <tbody>
 {filteredLogs.map((log: any) => (
 <motion.tr
 key={log.id}
 whileHover={{ y: -2, scale: 1.005 }}
 transition={{ duration: 0.15, ease: "easeOut" }}
 className="border-b border-border transition-colors hover:bg-surface-hover/80 cursor-pointer"
 >
 <td className="px-6 py-4 text-text-primary">
 {log.user_email}
 </td>

 <td className="px-6 py-4">

 <span
 className={`rounded-full px-3 py-1 text-xs font-medium
 ${log.action === "CREATE"
 ? "bg-green-500/20 text-green-400"
 : log.action === "UPDATE"
 ? "bg-yellow-500/20 text-yellow-400"
 : "bg-red-500/20 text-red-400"
 }`}
 >
 {log.action}
 </span>

 </td>

 <td className="px-6 py-4 text-text-primary">
 {log.entity}
 </td>

 <td className="px-6 py-4 text-secondary">
 {log.description}
 </td>

 <td className="px-6 py-4 text-muted">
 {new Date(
 log.created_at
 ).toLocaleString()}
 </td>
 </motion.tr>
 ))}
 </tbody>
 </table>
 </div>

 </div>
 );
}