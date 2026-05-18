"use client";

import Link from "next/link";
import CurrencyDropdown from "./CurrencyDropdown";
import { useCurrencyStore } from "@/store/currencyStore";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import BalanceCardSkeleton from "@/components/skeletons/BalanceCardSkeleton";

export default function BalanceCard() {
  const { user } = useAuth();
  const { wallet, loading } = useWallet();
  const { selected } = useCurrencyStore();

  const balance =
    wallet?.balances.find((b) => b.currency === selected.code)
      ?.available_balance || 0;

  const displayBalance = selected.code === "LBP" ? balance * 1 : balance;

  if (!user || loading) {
    return <BalanceCardSkeleton />;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8">
      <div className="flex justify-between items-start">
        {/* Left */}
        <div>
          <h2 className="text-lg">Hi, {user?.full_name || "..."}!</h2>

          <div className="text-4xl font-bold mt-4">
            {" "}
            {selected.symbol}
            {displayBalance.toLocaleString()}
          </div>
          <p className="mt-2 text-green-300">Available Balance</p>
        </div>

        {/* Right */}
        <div className="text-right">
          <CurrencyDropdown />
          <p className="text-2xl font-semibold mt-2">
            {" "}
            {selected.symbol}
            {displayBalance.toLocaleString()}
          </p>
          <p className="text-green-300 text-sm mt-1">{selected.code}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Link
          href="/pay"
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium"
        >
          Transfer Money
        </Link>
        <Link href="/deposit" className="bg-white/20 px-4 py-2 rounded-lg">
          Add Money
        </Link>
      </div>
    </div>
  );
}
