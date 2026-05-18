import api from "@/lib/api";
import { AdminDashboardStats } from "@/types";

// Get admin dashboard statistics
export const getAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const res = await api.get("/admin/dashboard-status");

    return res.data;
  };
