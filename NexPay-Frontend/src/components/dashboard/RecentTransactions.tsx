"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import TransactionsTableSkeleton from "@/components/skeletons/TransactionsTableSkeleton";

export default function RecentTransactions() {
  const { transactions, loading } = useTransactions(1, 5);
  const { user } = useAuth();

  if (!user || loading) {
    return <TransactionsTableSkeleton />;
  }

  if (!transactions.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 text-center">
        <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No transactions yet.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Your recent transactions will appear here
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "completed") {
      return {
        color:
          "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
        icon: "✓",
      };
    }
    if (statusLower === "pending") {
      return {
        color:
          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
        icon: "⏳",
      };
    }
    if (statusLower === "failed") {
      return {
        color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        icon: "✗",
      };
    }
    return {
      color: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
      icon: "•",
    };
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Transactions
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-7">
              Updated every several minutes
            </p>
          </div>

          <Link
            href="/transactions"
            className="group flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View All</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Transactions List */}
      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {transactions.map((tx, index) => {
          const isSender = tx.sender.phone_number === user?.phone_number;
          const otherParty = isSender ? tx.receiver : tx.sender;
          const dateObj = new Date(tx.created_at);
          const date = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const time = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const status =
            tx.status.charAt(0).toUpperCase() +
            tx.status.slice(1).toLowerCase();
          const statusBadge = getStatusBadge(tx.status);

          return (
            <div
              key={tx.id}
              className="flex px-6 py-4 items-center justify-between gap-4"
            >
              {/* Left Section - Icon & Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isSender ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"}`}
                >
                  {isSender ? (
                    <svg
                      className="w-5 h-5 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {otherParty.full_name}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
                    >
                      <span>{statusBadge.icon}</span>
                      {status}
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{otherParty.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-3 h-3"
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
                      <span>
                        {time} • {date}
                      </span>
                    </div>
                  </div>

                  {tx.description && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">
                      {tx.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Section - Amount */}
              <div className="text-right flex-shrink-0">
                <p
                  className={`font-bold text-lg ${isSender ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                >
                  {isSender ? "-" : "+"}$
                  {Math.abs(Number(tx.amount)).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {tx.currency || "USD"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Footer (Mobile) */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700 lg:hidden">
        <Link
          href="/transactions"
          className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 transition-colors"
        >
          <span>View All Transactions</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
