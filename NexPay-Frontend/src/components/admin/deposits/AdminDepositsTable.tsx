"use client";

import { useState } from "react";
import { AdminTopUp } from "@/types";

interface AdminDepositsTableProps {
  deposits: AdminTopUp[];
  onStatusChange?: (depositId: string, newStatus: string) => void;
}

export default function AdminDepositsTable({
  deposits,
  onStatusChange,
}: AdminDepositsTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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

  // Calculate summary statistics
  const totalAmount = deposits.reduce((sum, d) => sum + d.amount, 0);
  const completedAmount = deposits
    .filter((d) => d.status === "COMPLETED")
    .reduce((sum, d) => sum + d.amount, 0);
  const pendingAmount = deposits
    .filter((d) => d.status === "PENDING")
    .reduce((sum, d) => sum + d.amount, 0);
  const failedAmount = deposits
    .filter((d) => d.status === "FAILED")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Summary Bar */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Deposit Transactions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
              {deposits.length} total
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Completed:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  ${completedAmount.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Pending:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  ${pendingAmount.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Failed:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  ${failedAmount.toLocaleString()}
                </span>
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total Volume:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  ${totalAmount.toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Currency
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {deposits.map((deposit) => {
              const statusBadge = getStatusBadge(deposit.status);
              const date = new Date(deposit.created_at);
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const formattedTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <>
                  <tr
                    key={deposit.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 group cursor-pointer"
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === deposit.id ? null : deposit.id,
                      )
                    }
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                          {deposit.full_name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {deposit.full_name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <svg
                              className="w-3 h-3 text-gray-400"
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
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {/* {deposit.country_code}{" "} */}
                              {deposit.phone_number}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800 dark:text-white">
                        {getCurrencySymbol(deposit.currency)}
                        {deposit.amount?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Deposit
                      </p>
                    </td>

                    {/* Currency */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {deposit.currency}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}
                      >
                        <span>{statusBadge.icon}</span>
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {formattedDate}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {formattedTime}
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRow(
                              expandedRow === deposit.id ? null : deposit.id,
                            );
                          }}
                          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-400 transition-all duration-200"
                          title="View Details"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${expandedRow === deposit.id ? "rotate-180" : ""}`}
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

                        {onStatusChange && deposit.status === "PENDING" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(deposit.id, "COMPLETED");
                            }}
                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-all duration-200"
                            title="Mark as Completed"
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row Details */}
                  {expandedRow === deposit.id && (
                    <tr className="bg-gray-50 dark:bg-slate-700/30">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                              Transaction Details
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Deposit ID:</span>{" "}
                                {deposit.id}
                              </p>
                              {/* <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">
                                  Full Session ID:
                                </span>
                                <code className="ml-1 text-xs">
                                  {deposit.stripe_session_id}
                                </code>
                              </p> */}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                              User Information
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Name:</span>{" "}
                                {deposit.full_name}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Phone:</span>{" "}
                                {/* {deposit.country_code}{" "} */}
                                {deposit.phone_number}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                              Payment Information
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Amount:</span>{" "}
                                {getCurrencySymbol(deposit.currency)}
                                {deposit.amount} {deposit.currency}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Date:</span>{" "}
                                {new Date(deposit.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {deposits.length === 0 && (
        <div className="text-center py-12">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400">No deposits found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            No deposit transactions available
          </p>
        </div>
      )}
    </div>
  );
}
