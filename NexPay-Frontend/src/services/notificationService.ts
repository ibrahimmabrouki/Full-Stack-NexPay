import api from "@/lib/api";
import { NotificationsResponse, UnreadCountResponse } from "@/types";

// get notifications (paginated)
export const getNotifications = async (
  page = 1,
  limit = 10,
): Promise<NotificationsResponse> => {
  const res = await api.get("/notifications", {
    params: { page, limit },
  });
  return res.data;
};

// mark single notification as read
export const markAsRead = async (id: string) => {
  const res = await api.post(`/notifications/mark-as-read/${id}`);
  return res.data;
};

// mark all as read
export const markAllAsRead = async () => {
  const res = await api.post("/notifications/mark-all-as-read");
  return res.data;
};

// unread count
export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  const res = await api.get("/notifications/unread-count");
  return res.data;
};
