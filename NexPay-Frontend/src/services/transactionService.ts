import api from "@/lib/api";
import { TransfersResponse } from "@/types";

export const getTransfers = async (
  page = 1,
  limit = 10,
): Promise<TransfersResponse> => {
  const res = await api.get("/transfers", {
    params: { page, limit },
  });
  return res.data;
};
