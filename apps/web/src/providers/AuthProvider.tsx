"use client";

import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const autoLogin = useAuth((state) => state.autoLogin);

  useEffect(() => {
    autoLogin();
  }, []);

  return <>{children}</>;
}
