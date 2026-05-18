"use client";

import { useEffect, useState } from "react";
import { getTransferById } from "@/services/transactionService";
import { Transfer } from "@/types";

export const useTransaction = (id: string) => {
  const [transaction, setTransaction] = useState<Transfer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const data = await getTransferById(id);
        setTransaction(data);
      } catch (err) {
        console.error("Transaction fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  return {
    transaction,
    loading,
  };
};
