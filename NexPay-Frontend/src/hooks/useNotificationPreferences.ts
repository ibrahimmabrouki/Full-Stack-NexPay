"use client";

import { useEffect, useState } from "react";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/services/notificationPrefService";
import { NotificationPreference } from "@/types";

export const useNotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPreference | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const data = await getNotificationPreferences();
      setPreferences(data);
    } catch (err) {
      console.error("Preferences fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (updates: Partial<NotificationPreference>) => {
    try {
      const updated = await updateNotificationPreferences(updates);

      setPreferences((prev) => (prev ? { ...prev, ...updated } : updated));
    } catch (err) {
      console.error("Update preference error:", err);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return {
    preferences,
    loading,
    updatePreference,
    refetch: fetchPreferences,
  };
};
