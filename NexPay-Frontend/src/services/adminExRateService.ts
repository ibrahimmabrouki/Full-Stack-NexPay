import api from "@/lib/api";

import {
  GetExchangeRatesResponse,
  UpdateExchangeRatePayload,
  UpdateExchangeRateResponse,
} from "@/types";

// Get all exchange rates
export const getAdminExchangeRates =
  async (): Promise<GetExchangeRatesResponse> => {
    const res = await api.get("/admin/exchange-rates");

    return res.data;
  };

// Update exchange rate
export const updateAdminExchangeRate = async (
  payload: UpdateExchangeRatePayload,
): Promise<UpdateExchangeRateResponse> => {
  const res = await api.post("/admin/exchange-rates/update", payload);

  return res.data;
};
