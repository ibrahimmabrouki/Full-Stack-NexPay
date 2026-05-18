import api from "@/lib/api";
import {
  GetAnnouncementsResponse,
  CreateAnnouncementPayload,
  CreateAnnouncementResponse,
} from "@/types/index";

// Get all announcements
export const getAdminAnnouncements = async (
  page = 1,
  limit = 10,
): Promise<GetAnnouncementsResponse> => {
  const res = await api.get("/admin/announcements", {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};
// Create new announcement
export const createAnnouncement = async (
  payload: CreateAnnouncementPayload,
): Promise<CreateAnnouncementResponse> => {
  const res = await api.post("/admin/announcements", payload);

  return res.data;
};
