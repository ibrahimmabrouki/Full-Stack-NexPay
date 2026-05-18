"use client";

import { useEffect, useState } from "react";

import {
  getAdminExchangeRates,
  updateAdminExchangeRate,
} from "@/services/adminExRateService";
import ExchangeRatesTableSkeleton from "@/components/admin/skeletons/ExchangeRatesTableSkeleton";
import { ExchangeRateResponse, UpdateExchangeRatePayload } from "@/types";

export default function AdminExchangeRatesPage() {
  const [rates, setRates] = useState<ExchangeRateResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [rateValue, setRateValue] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      setLoading(true);

      const res = await getAdminExchangeRates();

      setRates(res.data);
    } catch (error) {
      console.error("Failed to fetch exchange rates", error);

      setMessage({
        type: "error",
        text: "Failed to fetch exchange rates",
      });
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (rate: ExchangeRateResponse) => {
    const key = `${rate.from_currency}-${rate.to_currency}`;

    setEditingKey(key);
    setRateValue(rate.exchange_rate);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setRateValue("");
  };

  const handleUpdate = async (
    from: "USD" | "EUR" | "LBP",
    to: "USD" | "EUR" | "LBP",
  ) => {
    try {
      setSubmitLoading(true);
      setMessage(null);

      const numericRate = Number(rateValue);

      if (!numericRate || numericRate <= 0) {
        setMessage({
          type: "error",
          text: "Rate must be greater than 0",
        });

        return;
      }

      const payload: UpdateExchangeRatePayload = {
        from,
        to,
        rate: numericRate,
      };

      await updateAdminExchangeRate(payload);

      setRates((prev) =>
        prev.map((item) => {
          if (item.from_currency === from && item.to_currency === to) {
            return {
              ...item,
              exchange_rate: String(numericRate),
            };
          }

          return item;
        }),
      );

      setMessage({
        type: "success",
        text: "Exchange rate updated successfully",
      });

      setEditingKey(null);
      setRateValue("");
    } catch (error) {
      console.error("Failed to update exchange rate", error);

      setMessage({
        type: "error",
        text: "Failed to update exchange rate",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Helper function to get currency display info
  const getCurrencyInfo = (currency: string) => {
    switch (currency) {
      case "USD":
        return { symbol: "$", name: "US Dollar" };
      case "EUR":
        return { symbol: "€", name: "Euro" };
      case "LBP":
        return { symbol: "ل.ل", name: "Lebanese Pound" };
      default:
        return { symbol: "", name: "" };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">
                Currency Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Exchange Rates
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage and update currency exchange rates manually
            </p>
          </div>

          {/* Last Updated Info */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <svg
              className="w-4 h-4 text-indigo-500"
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
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm animate-slideDown ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400"
              : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
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
            ) : (
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
              Real-time Updates
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Rates are applied instantly after update. Changes affect all
            currency conversions.
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-emerald-600"
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
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              No Conversion Fees
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Users pay no additional fees for currency conversion.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-purple-600"
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
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">
              Manual Control
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Exchange rates can be manually adjusted by administrators at any
            time.
          </p>
        </div>
      </div>

      {/* Rates Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-3">
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
                Exchange Rate Configuration
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {rates.length} rate pairs configured
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
            Edit rates below to update currency conversion values across the
            platform
          </p>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <ExchangeRatesTableSkeleton />
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Exchange Rate
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {rates.map((rate, index) => {
                  const key = `${rate.from_currency}-${rate.to_currency}`;
                  const isEditing = editingKey === key;
                  const fromInfo = getCurrencyInfo(rate.from_currency);
                  const toInfo = getCurrencyInfo(rate.to_currency);

                  return (
                    <tr
                      key={key}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {rate.from_currency}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {fromInfo.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {rate.to_currency}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {toInfo.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="relative max-w-[200px]">
                            <input
                              type="number"
                              step="0.0001"
                              value={rateValue}
                              onChange={(e) => setRateValue(e.target.value)}
                              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                              autoFocus
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                              1 {rate.from_currency} = ?
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              1 {rate.from_currency}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              =
                            </span>
                            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                              {rate.exchange_rate}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {rate.to_currency}
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdate(
                                    rate.from_currency,
                                    rate.to_currency,
                                  )
                                }
                                disabled={submitLoading}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all disabled:opacity-50 hover:scale-105"
                              >
                                {submitLoading ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                  </>
                                ) : (
                                  <>
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
                                    Save
                                  </>
                                )}
                              </button>

                              <button
                                onClick={cancelEditing}
                                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => startEditing(rate)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-medium transition-all hover:scale-105"
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
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                              Edit
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {rates.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-gray-300"
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
                        <p>No exchange rates found</p>
                        <p className="text-xs">
                          Please check your configuration
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Note Section */}
      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-5">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
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
          <div>
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">
              Important Notes
            </h3>
            <ul className="mt-2 text-xs text-amber-700 dark:text-amber-500 space-y-1">
              <li>
                • Exchange rates are applied in real-time to all user
                conversions
              </li>
              <li>
                • Rates should be positive numbers with up to 6 decimal places
              </li>
              <li>• Changes are effective immediately after saving</li>
              <li>
                • Inverse rates are calculated automatically for reverse
                conversions
              </li>
            </ul>
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
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
