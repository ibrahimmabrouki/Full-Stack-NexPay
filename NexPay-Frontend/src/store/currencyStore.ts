import { create } from "zustand";

type Currency = {
  code: "USD" | "EUR" | "LBP";
  label: string;
  symbol: string;
  flag: string;
};

type CurrencyStore = {
  selected: Currency;
  setCurrency: (currency: Currency) => void;
};

const currencies: Currency[] = [
  { code: "USD", label: "US Dollar", symbol: "$", flag: "/flags/us.png" },
  { code: "EUR", label: "Euro", symbol: "€", flag: "/flags/eu.png" },
  { code: "LBP", label: "Lebanese Lira", symbol: "ل.ل", flag: "/flags/lb.png" },
];

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  selected: currencies[0],
  setCurrency: (currency) => set({ selected: currency }),
}));

export { currencies };
