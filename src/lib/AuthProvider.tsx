import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { fetchShopProfile, type ShopProfile } from "./profile";

export type UserRole = "admin" | "user" | "client" | null;

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: UserRole;
  profile: ShopProfile | null;
  loading: boolean;
  passwordRecovery: boolean;
  refreshProfile: () => Promise<void>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
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

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [profile, setProfile] = useState<ShopProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  const loadProfile = useCallback(async (userId: string) => {
    const next = await fetchShopProfile(userId);
    setProfile(next);
    setRole(next?.role ?? null);
    return next;
  }, []);

  const refreshProfile = useCallback(async () => {
    const userId = session?.user.id;
    if (!userId) {
      setProfile(null);
      return;
    }
    await loadProfile(userId);
  }, [loadProfile, session?.user.id]);

  useEffect(() => {
    let mounted = true;

    async function applySession(
      nextSession: Session | null,
      recovery = false,
    ) {
      if (!nextSession) {
        if (!mounted) return;
        setSession(null);
        setRole(null);
        setProfile(null);
        setPasswordRecovery(false);
        setLoading(false);
        return;
      }

      if (recovery) {
        if (!mounted) return;
        setSession(nextSession);
        setPasswordRecovery(true);
        setLoading(false);
        return;
      }

      const nextProfile = await fetchShopProfile(nextSession.user.id);
      if (!mounted) return;
      if (nextProfile?.role !== "admin") {
        setSession(null);
        setRole(null);
        setProfile(null);
        setPasswordRecovery(false);
        setLoading(false);
        await supabase.auth.signOut({ scope: "local" });
        return;
      }
      setSession(nextSession);
      setRole(nextProfile.role);
      setProfile(nextProfile);
      setPasswordRecovery(false);
      setLoading(false);
    }

    void supabase.auth.getSession().then(({ data }) => {
      const hash = window.location.hash;
      const recovery = hash.includes("type=recovery");
      void applySession(data.session, recovery);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        if (event === "INITIAL_SESSION") return;
        if (event === "PASSWORD_RECOVERY") {
          window.setTimeout(() => {
            void applySession(nextSession, true);
          }, 0);
          return;
        }
        if (event === "TOKEN_REFRESHED") {
          setSession(nextSession);
          return;
        }
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
      profile,
      loading,
      passwordRecovery,
      refreshProfile,
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) return { error: error.message };
        if (!data.session || !data.user) {
          return { error: "That login did not work." };
        }
        const nextProfile = await fetchShopProfile(data.user.id);
        if (nextProfile?.role !== "admin") {
          setSession(null);
          setRole(null);
          setProfile(null);
          setLoading(false);
          await supabase.auth.signOut({ scope: "local" });
          return { error: "access_denied" };
        }
        setSession(data.session);
        setRole(nextProfile.role);
        setProfile(nextProfile);
        setPasswordRecovery(false);
        setLoading(false);
        void logAuthEvent("auth.login", data.user.id);
        return { error: null };
      },
      updatePassword: async (password) => {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) return { error: error.message };
        setPasswordRecovery(false);
        return { error: null };
      },
      signOut: async () => {
        const userId = session?.user.id;
        setSession(null);
        setRole(null);
        setProfile(null);
        setPasswordRecovery(false);
        setLoading(false);
        await supabase.auth.signOut({ scope: "local" });
        if (userId) {
          void logAuthEvent("auth.logout", userId);
        }
      },
    }),
    [loading, passwordRecovery, profile, refreshProfile, role, session],
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
