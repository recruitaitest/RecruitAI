"use client";

interface Props {
 users: any[];
}

export default function RecentUsersTable({
 users,
}: Props) {
 return (
 <div className="rounded-2xl border border-border bg-background p-6">
 <div className="mb-6">
 <h3 className="text-xl font-semibold text-text-primary">
 Recent Registrations
 </h3>

 <p className="text-sm text-muted">
 Latest users registered on the platform
 </p>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="border-b border-border">
 <th className="px-4 py-3 text-left text-muted">
 Name
 </th>

 <th className="px-4 py-3 text-left text-muted">
 Email
 </th>

 <th className="px-4 py-3 text-left text-muted">
 Role
 </th>

 <th className="px-4 py-3 text-left text-muted">
 Company
 </th>

 <th className="px-4 py-3 text-left text-muted">
 Joined
 </th>
 </tr>
 </thead>

 <tbody>
 {users.map((user) => (
 <tr
 key={user.id}
 className="border-b border-border"
 >
 <td className="px-4 py-4 text-text-primary">
 {user.name}
 </td>

 <td className="px-4 py-4 text-secondary">
 {user.email}
 </td>

 <td className="px-4 py-4 text-secondary">
 {user.role}
 </td>

 <td className="px-4 py-4 text-secondary">
 {user.company || "-"}
 </td>

 <td className="px-4 py-4 text-secondary">
 {new Date(
 user.created_at
 ).toLocaleDateString()}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );
}