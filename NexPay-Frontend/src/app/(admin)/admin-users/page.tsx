"use client";

import { useMemo, useState, useEffect } from "react";
import { getAdminUsers } from "@/services/adminUserService";
import { AdminUser } from "@/types";
import { updateAdminUser } from "@/services/adminUserService";
import UsersTable from "@/components/admin/users/UsersTable";
import UsersPageSkeleton from "@/components/admin/skeletons/UsersPageSkeleton";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAdminUsers();
        setUsers(res.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        user.phone_number.includes(search) ||
        user.id.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && user.is_active) ||
        (statusFilter === "DISABLED" && !user.is_active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const getRoleCount = (role: string) => {
    if (role === "ALL") return users.length;
    return users.filter((u) => u.role === role).length;
  };

  const getStatusCount = (status: string) => {
    if (status === "ALL") return users.length;
    if (status === "ACTIVE") return users.filter((u) => u.is_active).length;
    return users.filter((u) => !u.is_active).length;
  };

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    try {
      // 1. optimistic update (instant UI change)
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_active: newStatus } : u)),
      );

      // 2. persist to backend
      await updateAdminUser(userId, {
        is_active: newStatus,
      });
    } catch (error) {
      console.error("Failed to update user status", error);

      // 3. rollback if failed
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_active: !newStatus } : u,
        ),
      );
    }
  };

  if (loading) {
    return <UsersPageSkeleton />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">
                User Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Users
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage all platform users and accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, phone or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Role Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Role:
            </span>
            <div className="flex gap-1">
              {[
                { value: "ALL", label: "All", count: getRoleCount("ALL") },
                { value: "USER", label: "User", count: getRoleCount("USER") },
                {
                  value: "STAFF",
                  label: "Staff",
                  count: getRoleCount("STAFF"),
                },
                {
                  value: "COMPANY",
                  label: "Company",
                  count: getRoleCount("COMPANY"),
                },
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => setRoleFilter(role.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    roleFilter === role.value
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {role.label} ({role.count})
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Status:
            </span>
            <div className="flex gap-1">
              {[
                { value: "ALL", label: "All", count: getStatusCount("ALL") },
                {
                  value: "ACTIVE",
                  label: "Active",
                  count: getStatusCount("ACTIVE"),
                },
                {
                  value: "DISABLED",
                  label: "Disabled",
                  count: getStatusCount("DISABLED"),
                },
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setStatusFilter(status.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    statusFilter === status.value
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {status.label} ({status.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <UsersTable users={filteredUsers} onStatusChange={handleStatusChange} />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
