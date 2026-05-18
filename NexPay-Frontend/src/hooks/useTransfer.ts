"use client";

import { useState } from "react";
import { createTransfer } from "@/services/transferService";
import { CreateTransferDTO } from "@/types";
import { useWallet } from "./useWallet";

export const useTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { refetch: refetchWallet } = useWallet();

  const sendMoney = async (data: CreateTransferDTO) => {
    try {
      setLoading(true);
      setError(null);

      const res = await createTransfer(data);

      await refetchWallet();

      return res;
    } catch (err: any) {
      setError(err.response?.data?.error || "Transfer failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMoney,
    loading,
    error,
  };
};
