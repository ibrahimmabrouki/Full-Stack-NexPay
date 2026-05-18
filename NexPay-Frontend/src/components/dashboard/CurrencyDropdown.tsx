"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrencyStore, currencies } from "@/store/currencyStore";

export default function CurrencyDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { selected, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="text-right relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm opacity-90 cursor-pointer"
      >
        <img src={selected.flag} className="w-5 h-5 rounded-full" />
        {selected.label}
        <span>▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
          {currencies.map((cur) => (
            <div
              key={cur.code}
              onClick={() => {
                setCurrency(cur);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={cur.flag} className="w-5 h-5 rounded-full" />
              {cur.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
