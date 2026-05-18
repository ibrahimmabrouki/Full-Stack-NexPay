"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES, ADMIN_ROUTES } from "@/config/routes";

export function useAdminGuard() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    // Logged in but not STAFF
    if (user.role !== "STAFF") {
      router.replace(ROUTES.DASHBOARD);
      return;
    }
  }, [user, loading, router]);

  return {
    user,
    loading,
    isAdmin: user?.role === "STAFF",
  };
}
