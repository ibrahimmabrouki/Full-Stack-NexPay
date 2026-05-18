import api from "@/lib/api";
import { TransfersResponse } from "@/types";

export const getAdminTransfers = async (
  page = 1,
  limit = 10,
): Promise<TransfersResponse> => {
  const res = await api.get("/admin/transfers", {
    params: { page, limit },
  });

  return res.data;
};
