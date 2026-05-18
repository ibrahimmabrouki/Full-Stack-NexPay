"use client";

import { useMemo, useState, useEffect } from "react";
import AdminDepositsTable from "@/components/admin/deposits/AdminDepositsTable";
import { getAdminTopUps } from "@/services/adminDepositService";
import { AdminTopUp } from "@/types";
import DepositsPageSkeleton from "@/components/admin/skeletons/DepositsPageSkeleton";

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<AdminTopUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState("all");

  const filteredDeposits = useMemo(() => {
    return deposits.filter((deposit) => {
      // Search filter
      const matchesSearch =
        deposit.full_name.toLowerCase().includes(search.toLowerCase()) ||
        deposit.phone_number.includes(search) ||
        deposit.id.toLowerCase().includes(search.toLowerCase());
      // deposit.stripe_session_id.toLowerCase().includes(search.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "ALL" || deposit.status === statusFilter;

      // Date range filter
      let matchesDateRange = true;
      if (dateRange !== "all") {
        const now = new Date();
        const depositDate = new Date(deposit.created_at);
        const daysDiff = Math.floor(
          (now.getTime() - depositDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (dateRange === "7d") matchesDateRange = daysDiff <= 7;
        else if (dateRange === "30d") matchesDateRange = daysDiff <= 30;
        else if (dateRange === "90d") matchesDateRange = daysDiff <= 90;
      }

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [deposits, search, statusFilter, dateRange]);

  const getStatusCount = (status: string) => {
    if (status === "ALL") return deposits.length;
    return deposits.filter((d) => d.status === status).length;
  };

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await getAdminTopUps(1, 20);
        setDeposits(res);
      } catch (error) {
        console.error("Failed to fetch deposits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  if (loading) {
    return <DepositsPageSkeleton />;
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
                Payment Monitoring
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Deposits
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Monitor all user Stripe top-ups and deposit transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Filter Deposits
            </h2>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Search Input */}
            <div className="md:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Search
              </label>
              <div className="relative">
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
                  placeholder="Search by user, phone, or ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
            </div>

            {/* Status Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <div className="flex gap-2">
                {[
                  { value: "ALL", label: "All", count: getStatusCount("ALL") },
                  {
                    value: "COMPLETED",
                    label: "Completed",
                    count: getStatusCount("COMPLETED"),
                  },
                  {
                    value: "PENDING",
                    label: "Pending",
                    count: getStatusCount("PENDING"),
                  },
                  {
                    value: "FAILED",
                    label: "Failed",
                    count: getStatusCount("FAILED"),
                  },
                ].map((status) => (
                  <button
                    key={status.value}
                    onClick={() => setStatusFilter(status.value)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      statusFilter === status.value
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {status.label}
                    <span className="ml-1 text-xs opacity-75">
                      ({status.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Range
              </label>
              <div className="flex gap-2">
                {[
                  { value: "all", label: "All time" },
                  { value: "7d", label: "Last 7 days" },
                  { value: "30d", label: "Last 30 days" },
                  { value: "90d", label: "Last 90 days" },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      dateRange === range.value
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <AdminDepositsTable deposits={filteredDeposits} />

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
