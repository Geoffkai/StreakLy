import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./useAuth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined); //storage of session, undefined = Supabase hasn't answered yet, null=logged out, Session = logged in

  useEffect(() => {
    //Supabase calls this right away, then again on every login/logout
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return <AuthContext value={{ session }}>{children}</AuthContext>;
}
