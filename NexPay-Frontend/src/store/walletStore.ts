import { create } from "zustand";
import { WalletResponse } from "@/types";

type WalletStore = {
  wallet: WalletResponse | null;
  loading: boolean;
  setWallet: (wallet: WalletResponse) => void;
  setLoading: (loading: boolean) => void;
  clearWallet: () => void;
};

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,
  loading: false,

  setWallet: (wallet) => set({ wallet }),
  setLoading: (loading) => set({ loading }),
  clearWallet: () => set({ wallet: null }),
}));
