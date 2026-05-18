"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES, ADMIN_ROUTES } from "@/config/routes";

export function useProtectedRoute() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (user.role === "STAFF") {
      router.replace(ADMIN_ROUTES.DASHBOARD);
      return;
    }
  }, [user, loading, router]);

  return {
    user,
    loading,
  };
}
