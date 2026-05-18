"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/admin/dashboard/StatsCard";
import RecentUsersTable from "@/components/admin/dashboard/RecentUsersTable";
import RecentTransactions from "@/components/admin/dashboard/RecentTransactions";
import StatsCardSkeleton from "@/components/admin/skeletons/StatsCardSkeleton";
import RecentUsersTableSkeleton from "@/components/admin/skeletons/RecentUsersTableSkeleton";
import RecentTransactionsSkeleton from "@/components/admin/skeletons/RecentTransactionsSkeleton";
import { getAdminUsers } from "@/services/adminUserService";
import { getAdminTransfers } from "@/services/adminTransferService";
import { AdminUser, Transfer, AdminDashboardStats } from "@/types";
import { getAdminDashboardStats } from "@/services/adminDashboardStatsService";

export default function AdminDashboardPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [recentUsers, setRecentUsers] = useState<AdminUser[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<AdminDashboardStats>({
    total_users: 0,
    total_transfers: 0,
    total_deposits: 0,
  });

  // Update current time and greeting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formattedTime);

      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, transfersRes, statsRes] = await Promise.all([
          getAdminUsers(),
          getAdminTransfers(1, 5),
          getAdminDashboardStats(),
        ]);

        setRecentUsers(usersRes.users.slice(0, 5));
        setRecentTransactions(transfersRes.data.slice(0, 5));
        setStats(statsRes);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">
                System Online
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              {greeting}, Admin
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Monitor users, transactions, deposits, and platform activity.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Date Display */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Time Display */}
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {currentTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Users"
              value={stats.total_users.toLocaleString()}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            />

            <StatsCard
              title="Total Transfers"
              value={stats.total_transfers.toLocaleString()}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              }
            />

            <StatsCard
              title="Total Deposits"
              value={stats.total_deposits.toLocaleString()}
              icon={
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {loading ? (
            <RecentUsersTableSkeleton />
          ) : (
            <RecentUsersTable users={recentUsers} />
          )}
        </div>

        <div>
          {loading ? (
            <RecentTransactionsSkeleton />
          ) : (
            <RecentTransactions transactions={recentTransactions} />
          )}
        </div>
      </div>

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
