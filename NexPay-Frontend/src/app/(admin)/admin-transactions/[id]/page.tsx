"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function AdminTransferDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const transfer = useMemo(() => {
    return {
      id: searchParams.get("id") || "",
      amount: Number(searchParams.get("amount") || 0),
      currency: searchParams.get("currency") || "",
      status: searchParams.get("status") || "",
      description: searchParams.get("description") || "",
      created_at: searchParams.get("created_at") || "",

      sender_name: searchParams.get("sender_name") || "",
      sender_phone: searchParams.get("sender_phone") || "",

      receiver_name: searchParams.get("receiver_name") || "",
      receiver_phone: searchParams.get("receiver_phone") || "",
    };
  }, [searchParams]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return {
          color:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
          icon: "✓",
          label: "Completed",
        };
      case "PENDING":
        return {
          color:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",
          icon: "⏳",
          label: "Pending",
        };
      case "FAILED":
        return {
          color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
          icon: "✗",
          label: "Failed",
        };
      default:
        return {
          color:
            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
          icon: "•",
          label: status,
        };
    }
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "LBP":
        return "ل.ل";
      default:
        return "";
    }
  };

  const statusBadge = getStatusBadge(transfer.status);
  const formattedDate = transfer.created_at
    ? new Date(transfer.created_at).toLocaleString()
    : "-";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">
                Transaction Monitoring
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Transfer Details
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              View complete information about this transfer
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusBadge.color}`}
            >
              <span>{statusBadge.icon}</span>
              {statusBadge.label}
            </div>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Transfer Amount Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
          <p className="text-indigo-100 text-sm mb-2">Transfer Amount</p>
          <p className="text-4xl sm:text-5xl font-bold text-white">
            {getCurrencySymbol(transfer.currency)}
            {transfer.amount.toLocaleString()} {transfer.currency}
          </p>
          <p className="text-indigo-100 text-xs mt-3">
            Transaction ID: {transfer.id}
          </p>
        </div>
      </div>

      {/* Sender → Receiver Flow */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Transfer Flow
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
            Sender to receiver transaction path
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Sender */}
            <div className="flex-1 w-full">
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl p-5 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {transfer.sender_name?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                  <div>
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider">
                      Sender
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {transfer.sender_name || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {transfer.sender_phone || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">Transfer</p>
            </div>

            {/* Receiver */}
            <div className="flex-1 w-full">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {transfer.receiver_name?.charAt(0)?.toUpperCase() || "R"}
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                      Receiver
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {transfer.receiver_name || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {transfer.receiver_phone || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Transaction Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Transaction Information
              </h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Transaction ID
              </span>
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                {transfer.id}
              </code>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Amount
              </span>
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                {getCurrencySymbol(transfer.currency)}
                {transfer.amount.toLocaleString()} {transfer.currency}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}
              >
                <span>{statusBadge.icon}</span>
                {statusBadge.label}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Date & Time
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {formattedDate}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Description
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 text-right max-w-[60%] break-words">
                {transfer.description || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
            <div className="flex items-center gap-2 mb-4">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Transfer Summary
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Transfer Type
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Peer-to-Peer
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Processing Time
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  Instant
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Transaction Fee
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Free
                </span>
              </div>
            </div>
          </div>

          {/* Copy ID Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Need to reference this transaction?
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Copy the transaction ID to share
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(transfer.id);
                }}
                className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 transition-colors"
                title="Copy Transaction ID"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
