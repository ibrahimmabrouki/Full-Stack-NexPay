"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/services/conversionService";

export const useExchangeRate = (
  from_currency: "USD" | "EUR" | "LBP",
  to_currency: "USD" | "EUR" | "LBP",
) => {
  const [rate, setRate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setLoading(true);

        const res = await getExchangeRate(from_currency, to_currency);

        setRate(res.exchange_rate);
      } catch (error) {
        console.error("Exchange rate fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (from_currency && to_currency) {
      fetchRate();
    }
  }, [from_currency, to_currency]);

  return {
    rate,
    loading,
  };
};
