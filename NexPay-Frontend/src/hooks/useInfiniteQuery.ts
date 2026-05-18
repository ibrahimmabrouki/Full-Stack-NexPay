"use client";

import { useEffect, useState } from "react";

type FetchFunction<T> = (page: number, limit: number) => Promise<{ data: T[] }>;

export const useInfiniteQuery = <T>(fetchFn: FetchFunction<T>, limit = 10) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageToFetch = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const res = await fetchFn(pageToFetch, limit);

      if (pageToFetch === 1) {
        setData(res.data);
      } else {
        setData((prev) => [...prev, ...res.data]);
      }

      if (res.data.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return {
    data,
    loading,
    loadingMore,
    hasMore,
    loadMore,
  };
};
