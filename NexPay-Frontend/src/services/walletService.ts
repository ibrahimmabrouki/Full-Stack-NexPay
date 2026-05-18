import api from "@/lib/api";
import { WalletResponse } from "@/types";

export const getWalletBalances = async (): Promise<WalletResponse> => {
  const res = await api.get("/wallet/balances");
  return res.data;
};
