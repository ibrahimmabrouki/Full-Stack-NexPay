"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/services/conversionService";

type Rates = {
  usd_eur: number;
  usd_lbp: number;
  eur_lbp: number;
  eur_usd: number;
};

export const useMarketRates = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);

        const [usdEur, usdLbp, eurLbp, eurUsd] = await Promise.all([
          getExchangeRate("USD", "EUR"),
          getExchangeRate("USD", "LBP"),
          getExchangeRate("EUR", "LBP"),
          getExchangeRate("EUR", "USD"),
        ]);

        setRates({
          usd_eur: Number(usdEur.exchange_rate),
          usd_lbp: Number(usdLbp.exchange_rate),
          eur_lbp: Number(eurLbp.exchange_rate),
          eur_usd: Number(eurUsd.exchange_rate),
        });
      } catch (err) {
        console.error("Market rates error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading };
};
