"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES, ADMIN_ROUTES } from "@/config/routes";

export function useGuestGuard() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    if (user.role === "STAFF") {
      router.replace(ADMIN_ROUTES.DASHBOARD);
      return;
    }

    router.replace(ROUTES.DASHBOARD);
  }, [user, loading, router]);

  return {
    user,
    loading,
  };
}
