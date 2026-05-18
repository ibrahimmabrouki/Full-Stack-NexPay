"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useMarketRates } from "@/hooks/useMarketRates";
import { createConversion } from "@/services/conversionService";

const currencies = ["USD", "EUR", "LBP"];

export default function ConvertPage() {
  const [form, setForm] = useState({
    fromCurrency: "USD",
    toCurrency: "EUR",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { wallet, refetch } = useWallet();
  const { rates, loading: marketLoading } = useMarketRates();

  const balance =
    wallet?.balances.find((b) => b.currency === form.fromCurrency)
      ?.available_balance || 0;

  const [selectedBalance, setSelectedBalance] = useState<number | null>(null);

  const { rate } = useExchangeRate(
    form.fromCurrency as "USD" | "EUR" | "LBP",
    form.toCurrency as "USD" | "EUR" | "LBP",
  );

  const convertedAmount =
    form.amount && rate && !isNaN(Number(form.amount))
      ? (Number(form.amount) * Number(rate)).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newForm);

    // Check balance when amount changes
    if (e.target.name === "amount") {
      const amountNum = parseFloat(e.target.value);
      if (amountNum > balance) {
        setSelectedBalance(balance);
      } else {
        setSelectedBalance(null);
      }
    }
  };

  const handleSwapCurrencies = () => {
    setForm({
      ...form,
      fromCurrency: form.toCurrency,
      toCurrency: form.fromCurrency,
      amount: "",
    });
  };

  const handleConvert = () => {
    const amountNum = parseFloat(form.amount);

    if (!form.amount || amountNum <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (amountNum > balance) {
      alert(
        `Insufficient balance. You have ${balance.toLocaleString()} ${form.fromCurrency}`,
      );
      return;
    }

    setShowConfirmation(true);
  };

  const confirmConversion = async () => {
    try {
      setIsLoading(true);
      setShowConfirmation(false);

      await createConversion({
        from_currency: form.fromCurrency as "USD" | "EUR" | "LBP",
        to_currency: form.toCurrency as "USD" | "EUR" | "LBP",
        amount: Number(form.amount),
      });

      await refetch();

      setForm({ ...form, amount: "" });

      alert("Conversion completed successfully!");
    } catch (error: any) {
      console.error("Conversion error:", error);
      alert(error?.response?.data?.message || "Conversion failed");
    } finally {
      setIsLoading(false);
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Currency Exchange
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Convert between currencies instantly at real-time rates
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Conversion Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-white"
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
                <h2 className="text-white font-semibold">Convert Currency</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* You Send Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    You Send
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Balance: {getCurrencySymbol(form.fromCurrency)}
                    {balance.toLocaleString()}
                  </span>
                </div>

                <div
                  className={`
                  flex items-center border-2 rounded-xl px-4 py-3
                  focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent
                  transition-all duration-200
                  ${
                    selectedBalance
                      ? "border-red-300 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-slate-700"
                  }
                `}
                >
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="flex-1 outline-none text-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400"
                    min="0"
                    step="0.01"
                  />

                  <div className="relative">
                    <select
                      name="fromCurrency"
                      value={form.fromCurrency}
                      onChange={handleChange}
                      className="appearance-none bg-transparent outline-none text-gray-700 dark:text-gray-300 font-medium cursor-pointer pl-3 pr-8 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      {currencies.map((c) => (
                        <option key={c} value={c} className="dark:bg-slate-800">
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
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
                    </div>
                  </div>
                </div>

                {selectedBalance && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
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
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Insufficient balance
                  </p>
                )}
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwapCurrencies}
                  className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-all duration-200 hover:scale-110"
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
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>

              {/* You Receive Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  You Get
                </label>

                <div className="flex items-center bg-gray-50 dark:bg-slate-700/50 rounded-xl px-4 py-3 border-2 border-gray-200 dark:border-slate-600">
                  <input
                    type="text"
                    value={convertedAmount}
                    readOnly
                    className="flex-1 outline-none text-lg bg-transparent text-gray-900 dark:text-white font-medium"
                  />

                  <div className="relative">
                    <select
                      name="toCurrency"
                      value={form.toCurrency}
                      onChange={handleChange}
                      className="appearance-none bg-transparent outline-none text-gray-700 dark:text-gray-300 font-medium cursor-pointer pl-3 pr-8 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                    >
                      {currencies
                        .filter((c) => c !== form.fromCurrency)
                        .map((c) => (
                          <option
                            key={c}
                            value={c}
                            className="dark:bg-slate-800"
                          >
                            {c}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Exchange Rate Display */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Live Exchange Rate
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      1 {form.fromCurrency} = {Number(rate).toFixed(4)}{" "}
                      {form.toCurrency}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      1 {form.toCurrency} = {(1 / Number(rate)).toFixed(4)}{" "}
                      {form.fromCurrency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={
                  isLoading || !form.amount || parseFloat(form.amount) <= 0
                }
                className={`
                  w-full py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  hover:from-indigo-700 hover:to-purple-700
                  transform transition-all duration-200
                  ${
                    isLoading || !form.amount || parseFloat(form.amount) <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 hover:shadow-lg"
                  }
                  flex items-center justify-center gap-2
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
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
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    <span>Convert Money</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Info & Tips */}
        <div className="space-y-6">
          {/* Exchange Rate Info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Live Market Rates
              </h3>
            </div>

            {marketLoading ? (
              <p className="text-sm text-gray-400">Loading rates...</p>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    USD / EUR
                  </span>

                  <span className="font-medium text-gray-900 dark:text-white">
                    {rates?.usd_eur.toFixed(4)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    EUR / USD
                  </span>

                  <span className="font-medium text-gray-900 dark:text-white">
                    {rates?.eur_usd.toFixed(4)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    USD / LBP
                  </span>

                  <span className="font-medium text-gray-900 dark:text-white">
                    {rates?.usd_lbp.toFixed(0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Conversion Tips */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900">
            <div className="flex items-center gap-2 mb-3">
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
                Important Notes
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                No hidden fees for currency conversion
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                Real-time exchange rates from global markets
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                Minimum conversion amount: $1 USD (or equivalent)
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                Converted funds available instantly
              </p>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
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
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m0 5.656l3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need help with currency exchange?{" "}
                <a
                  href="https://wa.me/96176951671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl animate-slideUp">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg">
                Confirm Conversion
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    You Send:
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {getCurrencySymbol(form.fromCurrency)}
                    {parseFloat(form.amount).toLocaleString()}{" "}
                    {form.fromCurrency}
                  </span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    You Get:
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {getCurrencySymbol(form.toCurrency)}
                    {convertedAmount} {form.toCurrency}
                  </span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-slate-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Exchange Rate:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    1 {form.fromCurrency} = {Number(rate).toFixed(4)}{" "}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fee:</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmConversion}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
