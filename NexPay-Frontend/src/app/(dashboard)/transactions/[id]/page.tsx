"use client";

import { useRouter } from "next/navigation";
// import { useState } from "react";
import TransactionDetailsSkeleton from "@/components/skeletons/TransactionDetailsSkeleton";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function TransactionDetailsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const txFromQuery = searchParams.get("data");
  const parsedTx = txFromQuery ? JSON.parse(txFromQuery) : null;
  const tx = parsedTx;
  const loading = false;
  // const [showReceipt, setShowReceipt] = useState(false);
  const isSender = tx.sender.phone_number === user?.phone_number;

  const transactionName = isSender
    ? tx.receiver.full_name
    : tx.sender.full_name;

  if (!tx) return <div>Transaction not found</div>;

  const dateObj = new Date(tx.created_at);

  const date = dateObj.toLocaleDateString();

  const status =
    tx.status.charAt(0).toUpperCase() + tx.status.slice(1).toLowerCase();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "In Progress":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      case "Failed":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return (
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "In Progress":
        return (
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "Failed":
        return (
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <TransactionDetailsSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
          aria-label="Go back"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
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
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Transaction Details
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View complete information about this transaction
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg">
        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">
                  {transactionName?.charAt(0) || "T"}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {transactionName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <svg
                    className="w-4 h-4 text-indigo-200"
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
                  <p className="text-indigo-100 text-sm">{date}</p>
                </div>
              </div>
            </div>

            {/* Amount and Status */}
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {tx.amount} {tx.currency}
              </p>
              <div className="flex items-center justify-end gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
                >
                  {getStatusIcon(status)}
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Transaction Details */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
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
              <h2 className="font-semibold text-gray-800 dark:text-white text-lg">
                Transaction Breakdown
              </h2>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Payment Amount
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {tx.amount} {tx.currency}
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-slate-600 pt-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    Total Amount
                  </span>
                  <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                    {tx.amount} {tx.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h2 className="font-semibold text-gray-800 dark:text-white text-lg">
                  Payment Information
                </h2>
              </div>

              <div className="space-y-4 pl-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {isSender ? "Payment To" : "Payment From"}
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white mt-1">
                      {transactionName || "User"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Transaction Date
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white mt-1">
                      {new Date(tx.created_at).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>

                <p className="text-s text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
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
                      d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.865l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a2 2 0 011.865-.45l2.064.516A2 2 0 0119.72 19H22a2 2 0 012 2v1a1 1 0 01-1 1h-1C10.85 23 1 13.15 1 2V1a1 1 0 011-1h1a2 2 0 012 2z"
                    />
                  </svg>

                  {isSender ? tx.receiver.phone_number : tx.sender.phone_number}
                </p>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
                    {tx.description || "No descriotion available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction ID
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                      {tx.id}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(tx.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                    >
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setShowReceipt(!showReceipt)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {showReceipt ? "Hide Receipt" : "Download Receipt"}
              </button>
            </div> */}

            {/* Receipt Preview */}
            {/* {showReceipt && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600 animate-slideDown">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Receipt Preview
                  </h3>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700">
                    Print
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-xs">{tx.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold">
                      {tx.amount} {tx.currency}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={
                          tx.status === "Completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
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
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
