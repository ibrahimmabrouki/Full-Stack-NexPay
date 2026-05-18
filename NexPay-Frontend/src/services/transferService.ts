import api from "@/lib/api";
import { CreateTransferDTO, Transfer } from "@/types";

export const createTransfer = async (
  data: CreateTransferDTO,
): Promise<{ transfer: Transfer }> => {
  const res = await api.post("/transfers", data);
  return res.data;
};