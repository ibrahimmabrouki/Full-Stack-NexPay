"use client";

import Link from "next/link";
import { Transfer } from "@/types";

interface TransactionTableRowProps {
  transaction: Transfer;
}

export default function TransactionTableRow({
  transaction,
}: TransactionTableRowProps) {
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

  const statusBadge = getStatusBadge(transaction.status);
  const date = new Date(transaction.created_at);
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
    <tr className="border-t border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 group">
      {/* Transaction ID */}
      <td className="px-6 py-4">
        <div>
          <Link
            href={`/admin-transactions/${transaction.id}`}
            className="font-semibold text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            #{transaction.id.slice(0, 8)}
          </Link>
          <div className="flex items-center gap-1 mt-1">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate} at {formattedTime}
            </p>
          </div>
        </div>
      </td>

      {/* Sender */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
            {transaction.sender.full_name?.charAt(0)?.toUpperCase() || "S"}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {transaction.sender.full_name}
          </span>
        </div>
      </td>

      {/* Receiver */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-semibold">
            {transaction.receiver.full_name?.charAt(0)?.toUpperCase() || "R"}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {transaction.receiver.full_name}
          </span>
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <p className="font-bold text-gray-800 dark:text-white">
            {getCurrencySymbol(transaction.currency)}
            {transaction.amount?.toLocaleString()} {transaction.currency}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Transfer
          </p>
        </div>
      </td>

      {/* Description */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
            {transaction.description || "—"}
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

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Link
            href={{
              pathname: `/admin-transactions/${transaction.id}`,
              query: {
                id: transaction.id,
                amount: transaction.amount,
                currency: transaction.currency,
                status: transaction.status,
                description: transaction.description,
                created_at: transaction.created_at,

                sender_name: transaction.sender.full_name,
                sender_phone: transaction.sender.phone_number,

                receiver_name: transaction.receiver.full_name,
                receiver_phone: transaction.receiver.phone_number,
              },
            }}
            className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 transition-all duration-200 group/tooltip relative"
            title="View Transaction Details"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-400 transition-all duration-200 group/tooltip relative"
            title="Copy Transaction ID"
            onClick={() => {
              navigator.clipboard.writeText(transaction.id);
              // Optional: Add toast notification here
            }}
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
