import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

type AuthValue = { session: Session | null | undefined };

export const AuthContext = createContext<AuthValue | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return value;
}
