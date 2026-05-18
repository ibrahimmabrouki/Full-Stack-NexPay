"use client";

import { useEffect, useState } from "react";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@/services/notificationService";
import { Notification } from "@/types";

export const useNotifications = (initialPage = 1, limit = 10) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async (pageToFetch = page, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const [notifRes, countRes] = await Promise.all([
        getNotifications(pageToFetch, limit),
        getUnreadCount(),
      ]);

      if (pageToFetch === 1) {
        setNotifications(notifRes.data);
      } else {
        setNotifications((prev) => [...prev, ...notifRes.data]);
      }

      if (notifRes.data.length < limit) {
        setHasMore(false);
      }

      setUnreadCount(countRes.count);
    } catch (err) {
      console.error("Notifications error:", err);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    if (!hasMore || loadingMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage, true);
  };

  const markOneAsRead = async (id: string) => {
    await markAsRead(id);

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );

    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAll = async () => {
    await markAllAsRead();

    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));

    setUnreadCount(0);
  };

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  return {
    notifications,
    loading,
    loadingMore,
    unreadCount,
    loadMore,
    hasMore,
    markOneAsRead,
    markAll,
  };
};
