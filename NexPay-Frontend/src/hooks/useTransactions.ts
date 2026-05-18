"use client";

import { useEffect, useState } from "react";
import { Transfer } from "@/types";
import { getTransfers } from "@/services/transactionService";

export const useTransactions = (initialPage = 1, limit = 10) => {
  const [transactions, setTransactions] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (pageToFetch = page, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const res = await getTransfers(pageToFetch, limit);

      if (pageToFetch === 1) {
        setTransactions(res.data);
      } else {
        setTransactions((prev) => [...prev, ...res.data]);
      }

      if (res.data.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Transactions fetch error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage, true);
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  return {
    transactions,
    loading,
    loadingMore,
    loadMore,
    hasMore,
  };
};
