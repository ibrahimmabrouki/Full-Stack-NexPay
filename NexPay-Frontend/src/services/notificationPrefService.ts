import api from "@/lib/api";
import {
  NotificationPreference,
  NotificationPreferenceResponse,
} from "@/types";

// GET preferences
export const getNotificationPreferences =
  async (): Promise<NotificationPreference> => {
    const res = await api.get<NotificationPreferenceResponse>(
      "/notification-preferences",
    );
    return res.data.data;
  };

// UPDATE preferences
export const updateNotificationPreferences = async (
  data: Partial<NotificationPreference>,
): Promise<NotificationPreference> => {
  const res = await api.patch<NotificationPreferenceResponse>(
    "/notification-preferences",
    data,
  );
  return res.data.data;
};
