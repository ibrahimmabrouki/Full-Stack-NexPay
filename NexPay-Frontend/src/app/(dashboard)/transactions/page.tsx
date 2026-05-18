"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteQuery } from "@/hooks/useInfiniteQuery";
import { getTransfers } from "@/services/transactionService";
import { getTopups } from "@/services/stripeService";
import { getConversions } from "@/services/conversionService";
import { Conversion, Topup, Transfer } from "@/types";
import TransactionsSkeleton from "@/components/skeletons/TransactionsSkeleton";

export default function TransactionsPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [activeTab, setActiveTab] = useState("TRANSFER");
  const [transferSubTab, setTransferSubTab] = useState("SEND");
  const transfersQuery = useInfiniteQuery(getTransfers, 10);
  const topupsQuery = useInfiniteQuery(getTopups, 10);
  const conversionsQuery = useInfiniteQuery(getConversions, 10);
  const activeData =
    activeTab === "TRANSFER"
      ? transfersQuery
      : activeTab === "DEPOSIT"
        ? topupsQuery
        : conversionsQuery;
  const transferData = transfersQuery.data;
  const topupData = topupsQuery.data;
  const conversionData = conversionsQuery.data;
  const loadMore = activeData.loadMore;
  const loadingMore = activeData.loadingMore;
  const hasMore = activeData.hasMore;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const renderMode = activeTab;
  const router = useRouter();

  const transferTransactions = transferData.map((tx) => ({
    ...tx,
    direction:
      tx.sender.phone_number === user?.phone_number ? "SEND" : "RECEIVED",
  }));

  useEffect(() => {
    if (sessionId) {
      setActiveTab("DEPOSIT");
    }
  }, [sessionId]);

  let filteredData: any[] = [];

  if (activeTab === "TRANSFER") {
    filteredData =
      transferSubTab === "SEND"
        ? transferTransactions.filter((t) => t.direction === "SEND")
        : transferTransactions.filter((t) => t.direction === "RECEIVED");
  }

  if (activeTab === "DEPOSIT") {
    filteredData = topupData;
  }

  if (activeTab === "CONVERSION") {
    filteredData = conversionData;
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    filteredData = filteredData.filter((tx: any) => {
      const txDate = new Date(tx.created_at);
      return txDate >= start && txDate <= end;
    });
  }
  const totalTransactions = filteredData.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    const el = loaderRef.current;

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasMore, loadingMore, loadMore]);

  if (!user || activeData.loading) {
    return <TransactionsSkeleton />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            View and manage all your financial activities
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:border-indigo-300 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-400"
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
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {startDate && endDate
                ? `${startDate} - ${endDate}`
                : "Select date range"}
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDatePickerOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-4 z-10">
              <div className="space-y-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />

                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Transactions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalTransactions}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-indigo-600"
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
          </div>
        </div>

        {/* <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
              <p
                className={`text-2xl font-bold ${totalAmount >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                ${Math.abs(totalAmount).toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Deposits
              </p>
              <p className="text-2xl font-bold text-green-600">
                +${totalDeposits.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
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
            </div>
          </div>
        </div> */}
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-400"
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

            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter Transactions
            </p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* MAIN TABS */}
          <div className="flex flex-wrap gap-2">
            {["TRANSFER", "DEPOSIT", "CONVERSION"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              activeTab === tab
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105"
                : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            }
          `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TRANSFER SUB FILTERS */}
          {activeTab === "TRANSFER" && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-slate-700">
              {["SEND", "RECEIVED"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setTransferSubTab(sub as any)}
                  className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${
                transferSubTab === sub
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300"
              }
            `}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transactions Cards */}
      <div className="space-y-4">
        {/* TRANSFERS */}
        {renderMode === "TRANSFER" &&
          filteredData.map((tx: Transfer, index: number) => {
            const isSender = tx.sender.phone_number === user?.phone_number;

            const dateObj = new Date(tx.created_at);
            const date = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const getStatusBadge = (status: string) => {
              const statusLower = status?.toLowerCase();
              if (statusLower === "completed") {
                return {
                  color:
                    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                  icon: "✓",
                  label: "Completed",
                };
              }
              if (statusLower === "pending") {
                return {
                  color:
                    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
                  icon: "⏳",
                  label: "Pending",
                };
              }
              if (statusLower === "failed") {
                return {
                  color:
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                  icon: "✗",
                  label: "Failed",
                };
              }
              return {
                color:
                  "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                icon: "•",
                label: status || "COMPLETED",
              };
            };

            const statusBadge = getStatusBadge(tx.status);

            return (
              <div
                key={tx.id}
                onClick={() =>
                  router.push(
                    `/transactions/${tx.id}?data=${encodeURIComponent(JSON.stringify(tx))}`,
                  )
                }
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-slideIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section - Icon & Main Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isSender ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"}`}
                    >
                      {isSender ? (
                        <svg
                          className="w-6 h-6 text-red-600 dark:text-red-400"
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
                          className="w-6 h-6 text-green-600 dark:text-green-400"
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

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tx.description ||
                            (isSender ? "Sent Transfer" : "Received Transfer")}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
                        >
                          <span>{statusBadge.icon}</span>
                          {statusBadge.label}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {isSender
                          ? `Transfer to ${tx.receiver.full_name}`
                          : `Transfer from ${tx.sender.full_name}`}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 my-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.865l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a2 2 0 011.865-.45l2.064.516A2 2 0 0119.72 19H22a2 2 0 012 2v1a1 1 0 01-1 1h-1C10.85 23 1 13.15 1 2V1a1 1 0 011-1h1a2 2 0 012 2z"
                          />
                        </svg>

                        {isSender
                          ? tx.receiver.phone_number
                          : tx.sender.phone_number}
                      </p>

                      <div className="flex items-center flex-wrap gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
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
                            {date} at {time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                            />
                          </svg>
                          <span>{tx.currency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0h4"
                            />
                          </svg>
                          <span>ID: {tx.id?.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Amount */}
                  <div className="text-right flex-shrink-0">
                    <p
                      className={`font-bold text-xl ${isSender ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                    >
                      {isSender ? "-" : "+"}
                      {tx.amount?.toLocaleString()} {tx.currency}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {isSender ? "Debit" : "Credit"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        {/* TOPUPS / DEPOSITS */}
        {renderMode === "DEPOSIT" &&
          filteredData.map((tx: Topup, index: number) => {
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

            const getStatusBadge = (status: string) => {
              const statusLower = status?.toLowerCase();

              if (statusLower === "completed" || statusLower === "paid") {
                return {
                  color:
                    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                  icon: "✓",
                  label: "Completed",
                };
              }

              if (statusLower === "pending") {
                return {
                  color:
                    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
                  icon: "⏳",
                  label: "Pending",
                };
              }

              if (statusLower === "failed" || statusLower === "canceled") {
                return {
                  color:
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                  icon: "✗",
                  label: "Cancelled",
                };
              }

              return {
                color:
                  "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                icon: "•",
                label: status || "Unknown",
              };
            };

            const statusBadge = getStatusBadge(tx.status);
            const isCancelled =
              tx.status?.toLowerCase() === "canceled" ||
              tx.status?.toLowerCase() === "failed";

            return (
              <div
                key={tx.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-300 group animate-slideIn"
                style={{ animationDelay: `${index * 50}ms` }}
                // onClick={() => router.push(`/transactions/${tx.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Stripe Deposit
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
                        >
                          <span>{statusBadge.icon}</span>
                          {statusBadge.label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Added funds to your wallet via Stripe
                      </p>

                      <div className="flex items-center flex-wrap gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
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
                            {date} at {time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                            />
                          </svg>
                          <span>{tx.currency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0h4"
                            />
                          </svg>
                          <span>ID: {tx.id?.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Amount */}
                  <div className="text-right flex-shrink-0">
                    <p
                      className={`font-bold text-xl ${
                        isCancelled
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {isCancelled ? "" : "+"}
                      {tx.amount?.toLocaleString()} {tx.currency}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isCancelled
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {isCancelled ? "Cancelled" : "Credit"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        {/* CONVERSIONS */}
        {renderMode === "CONVERSION" &&
          filteredData.map((tx: Conversion, index: number) => {
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
                  color:
                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                  icon: "✗",
                };
              }
              return {
                color:
                  "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                icon: "•",
              };
            };

            const statusBadge = getStatusBadge(tx.status);

            return (
              <div
                key={tx.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-300 group animate-slideIn"
                style={{ animationDelay: `${index * 50}ms` }}
                // onClick={() => router.push(`/transactions/${tx.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Currency Conversion
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
                        >
                          <span>{statusBadge.icon}</span>
                          {tx.status || "COMPLETED"}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {tx.from_currency} → {tx.to_currency}
                      </p>

                      <div className="flex items-center flex-wrap gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
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
                            {date} at {time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                          <span>Rate: {Number(tx.rate_used)?.toFixed(4)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0h4"
                            />
                          </svg>
                          <span>ID: {tx.id?.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {tx.amount_from} {tx.from_currency}
                    </p>
                    <p className="font-bold text-lg text-purple-600 dark:text-purple-400">
                      {tx.amount_to} {tx.to_currency}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        <div ref={loaderRef} className="py-4 flex justify-center">
          {loadingMore && (
            <div className="text-sm text-gray-500">Loading more...</div>
          )}

          {!loadingMore && !hasMore && (
            <div className="text-xs text-gray-400">You’ve reached the end</div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-500"
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No transactions found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {renderMode === "TRANSFER" && "You haven't made any transfers yet"}
            {renderMode === "DEPOSIT" && "No deposit transactions found"}
            {renderMode === "CONVERSION" && "No currency conversions yet"}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Try changing your filter or make your first transaction
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
