"use client";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/services/adminService";
import EditUserModal from "./EditUserModal";
import { hasPermission } from "@/utils/permissions";

export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleDelete = async (userId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            Users Management
          </h3>

          <p className="mt-1 text-sm text-muted">
            {users.length} users registered
          </p>

          <p className="mt-1 text-sm text-muted">
            Review registrations, assign roles, and manage user access
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-border bg-surface">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-muted">
                Company
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-muted">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <motion.tr
                  key={user.id}
                  whileHover={{ y: -2, scale: 1.005 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="border-b border-border transition hover:bg-surface/40 cursor-pointer"
                >
                  {/* User */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <p className="font-medium text-text-primary">
                          {user.name}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />

                      <span className="text-sm text-text-primary">
                        {user.role.replaceAll("_", " ")}
                      </span>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-5 text-sm text-secondary">
                    {user.company || "-"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {hasPermission("users.update") && (
                        <button
                          onClick={() => {
                            setEditingUser(user);
                          }}
                          className="rounded-lg p-2 text-muted transition hover:bg-secondary-surface hover:text-text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}

                      {hasPermission("users.delete") && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-lg p-2 text-muted transition hover:bg-secondary-surface hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      <button className="rounded-lg p-2 text-muted transition hover:bg-secondary-surface hover:text-text-primary">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <EditUserModal
          editUser={editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={fetchUsers}
        />
      )}
    </div>
  );
}