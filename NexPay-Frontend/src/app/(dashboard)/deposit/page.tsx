"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createStripeSession } from "@/services/stripeService";
import { cancelStripeTopup } from "@/services/stripeService";

export default function DepositPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const searchParams = useSearchParams();
  const isCancelled = searchParams.get("cancel") === "true";
  const topupId = searchParams.get("topup_id");
  const [showCancelMessage, setShowCancelMessage] = useState(false);

  const handleDeposit = async () => {
    try {
      setIsLoading(true);

      const parsedAmount = Number(amount);

      if (!parsedAmount || parsedAmount <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      const res = await createStripeSession({
        amount: parsedAmount,
        currency: "USD",
      });

      if (res.url) {
        window.location.href = res.url; // redirect to Stripe
      }
    } catch (error: any) {
      console.error("Deposit error:", error);
      alert(
        error?.response?.data?.message || "Failed to create deposit session",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCancelled) {
      setShowCancelMessage(true);
    }
  }, [isCancelled]);

  useEffect(() => {
    if (showCancelMessage) {
      const timer = setTimeout(() => {
        setShowCancelMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showCancelMessage]);

  useEffect(() => {
    const handleCancel = async () => {
      if (isCancelled && topupId) {
        try {
          await cancelStripeTopup(topupId);
        } catch (err) {
          console.error("Cancel topup failed:", err);
        }
      }
    };

    handleCancel();
  }, [isCancelled, topupId]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Deposit Money
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Add funds to your wallet securely via Stripe
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Deposit Card */}
        <div className="lg:col-span-2">
          {showCancelMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300">
              ❌ Deposit was cancelled. No money was charged.
              {topupId && (
                <p className="text-xs mt-1 opacity-70">
                  Reference ID: {topupId}
                </p>
              )}
            </div>
          )}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <h2 className="text-white font-semibold">
                  Add Funds to Wallet
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Info Message */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
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
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p>
                      You will be redirected to Stripe's secure payment page to
                      complete your deposit.
                    </p>
                    <p className="mt-1 text-xs opacity-75">
                      Supported currencies: USD
                    </p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Why deposit with Stripe?
                </h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span>Instant deposit confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span>Major credit and debit cards accepted</span>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Deposit Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (Number(value) < 0) return;

                      setAmount(value);
                    }}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Note */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  * All deposits are processed in USD only
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                {[10, 50, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(String(val))}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600"
                  >
                    ${val}
                  </button>
                ))}
              </div>

              {/* Deposit Button */}
              <button
                onClick={handleDeposit}
                disabled={isLoading}
                className={`
                  w-full py-4 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-green-600 to-emerald-600
                  hover:from-green-700 hover:to-emerald-700
                  transform transition-all duration-200
                  ${
                    isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-105 hover:shadow-lg"
                  }
                  flex items-center justify-center gap-2
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Redirecting to Stripe...</span>
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Deposit via Stripe</span>
                  </>
                )}
              </button>

              {/* Note */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By proceeding, you agree to Stripe's{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - How it Works & Security */}
        <div className="space-y-6">
          {/* How it works */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                How it works
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Click Deposit Button",
                  desc: "Click the button above to start your deposit",
                },
                {
                  step: 2,
                  title: "Secure Payment",
                  desc: "Complete payment on Stripe's secure page",
                },
                {
                  step: 3,
                  title: "Instant Credit",
                  desc: "Funds appear in your wallet immediately",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-semibold">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 border border-green-100 dark:border-green-900">
            <div className="flex items-center gap-2 mb-3">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Secure Payment
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span>✓</span> PCI-DSS compliant payment processing
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span>✓</span> 256-bit SSL encryption
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <span>✓</span> No card details stored on our servers
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-green-200 dark:border-green-800">
              <svg
                className="w-8 h-8 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Powered by
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Stripe
                </p>
              </div>
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
                Need help? Contact our{" "}
                <a
                  href="https://wa.me/96176951671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  support team
                </a>
              </p>
            </div>
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
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
