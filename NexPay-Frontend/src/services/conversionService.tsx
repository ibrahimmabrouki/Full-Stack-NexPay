import api from "@/lib/api";
import {
  ConversionsResponse,
  ExchangeRateResponse,
  CreateConversionDTO,
  ConversionResponse,
} from "@/types/index";

// Get conversions history
export const getConversions = async (
  page = 1,
  limit = 10,
): Promise<ConversionsResponse> => {
  const res = await api.get("/conversions", {
    params: { page, limit },
  });

  return res.data;
};

// Get exchange rate
export const getExchangeRate = async (
  from_currency: "USD" | "EUR" | "LBP",
  to_currency: "USD" | "EUR" | "LBP",
): Promise<ExchangeRateResponse> => {
  const res = await api.get(
    `/currency-rates/exchange-rate/${from_currency}/${to_currency}`,
  );

  return res.data;
};

// create conversion
export const createConversion = async (data: CreateConversionDTO) => {
  const res = await api.post("/conversions", data);
  return res.data;
};
