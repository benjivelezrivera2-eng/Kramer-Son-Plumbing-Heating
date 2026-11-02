import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type UserRole = "admin" | "user" | "client" | null;

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: UserRole;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function logAuthEvent(action: "auth.login" | "auth.logout", userId: string) {
  try {
    await supabase.rpc("log_activity", {
      p_entity_type: "auth",
      p_entity_id: userId,
      p_action: action,
      p_actor_type: "admin",
      p_actor_id: userId,
      p_metadata: {},
    });
  } catch {
    // History is optional. Never block login or logout on it.
  }
}

async function fetchRole(userId: string): Promise<UserRole> {
  const { data, error } = await supabase
    .from("profile")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data?.role) return null;
  if (data.role === "admin" || data.role === "user" || data.role === "client") {
    return data.role;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function applySession(nextSession: Session | null) {
      if (!nextSession) {
        if (!mounted) return;
        setSession(null);
        setRole(null);
        setLoading(false);
        return;
      }

      const nextRole = await fetchRole(nextSession.user.id);
      if (!mounted) return;
      if (nextRole !== "admin") {
        setSession(null);
        setRole(null);
        setLoading(false);
        await supabase.auth.signOut({ scope: "local" });
        return;
      }
      setSession(nextSession);
      setRole(nextRole);
      setLoading(false);
    }

    void supabase.auth.getSession().then(({ data }) => {
      void applySession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        if (event === "INITIAL_SESSION") return;
        if (event === "TOKEN_REFRESHED") {
          setSession(nextSession);
          return;
        }
        // Querying Supabase inside this callback can deadlock the auth client.
        window.setTimeout(() => {
          void applySession(nextSession);
        }, 0);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      role,
      loading,
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) return { error: error.message };
        if (!data.session || !data.user) {
          return { error: "That login did not work." };
        }
        const nextRole = await fetchRole(data.user.id);
        if (nextRole !== "admin") {
          setSession(null);
          setRole(null);
          setLoading(false);
          await supabase.auth.signOut({ scope: "local" });
          return { error: "access_denied" };
        }
        setSession(data.session);
        setRole(nextRole);
        setLoading(false);
        void logAuthEvent("auth.login", data.user.id);
        return { error: null };
      },
      signOut: async () => {
        const userId = session?.user.id;
        setSession(null);
        setRole(null);
        setLoading(false);
        await supabase.auth.signOut({ scope: "local" });
        if (userId) {
          void logAuthEvent("auth.logout", userId);
        }
      },
    }),
    [loading, role, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
