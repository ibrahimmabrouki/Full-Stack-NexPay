import api from "@/lib/api";
import { AdminTopUpsResponse } from "@/types";

export const getAdminTopUps = async (
  page = 1,
  limit = 10,
): Promise<AdminTopUpsResponse> => {
  const res = await api.get("/admin/top-ups", {
    params: {
      page,
      limit,
    },
  });

  return res.data.map((topup: any) => ({
    ...topup,
    amount: Number(topup.amount),
  }));
};
