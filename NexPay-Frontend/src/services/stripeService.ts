import api from "@/lib/api";
import { TopupsResponse } from "@/types/index";

export const getTopups = async (
  page = 1,
  limit = 10,
): Promise<TopupsResponse> => {
  const res = await api.get("/stripe", {
    params: { page, limit },
  });

  return res.data;
};

export const createStripeSession = async (data: {
  amount: number;
  currency?: "USD" | "EUR" | "LBP";
}): Promise<{ message: string; url: string }> => {
  const res = await api.post("/stripe/create-session", data);
  return res.data;
};

export const cancelStripeTopup = async (topup_id: string) => {
  const res = await api.post("/stripe/cancel", {
    topup_id,
  });

  return res.data;
};
