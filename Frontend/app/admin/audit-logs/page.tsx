import AdminLayout
from "@/components/admin/layout/AdminLayout";

import AuditLogsTable
from "@/components/admin/audit/AuditLogsTable";

export default function AuditLogsPage() {

 return (
 <AdminLayout>

 <div className="space-y-8">

 <div>
 <h2 className="text-3xl font-bold text-text-primary">
 Audit Logs
 </h2>

 <p className="text-muted">
 Track platform activities and administrative actions.
 </p>
 </div>

 <AuditLogsTable />

 </div>

 </AdminLayout>
 );
}