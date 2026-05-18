"use client";

import { useEffect } from "react";
import { getWalletBalances } from "@/services/walletService";
import { useWalletStore } from "@/store/walletStore";

export const useWallet = () => {
  const { wallet, setWallet, loading, setLoading } = useWalletStore();

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const data = await getWalletBalances();
      setWallet(data);
    } catch (err) {
      console.error("Wallet fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!wallet) {
      fetchWallet();
    }
  }, []);

  return {
    wallet,
    loading,
    refetch: fetchWallet,
  };
};
