"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "@/lib/api";

export type User = { id: string; email: string; fullName: string; country: string; emailVerified: boolean; kycStatus: string };
type Ctx = {
  user: User | null; token: string | null; ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void; refresh: () => Promise<void>; setUser: (u: User) => void;
};
const C = createContext<Ctx>(null as unknown as Ctx);
export const useAuth = () => useContext(C);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const load = useCallback(async (t: string) => {
    try { setUser(await api<User>("/me", { token: t })); setToken(t); }
    catch { sessionStorage.removeItem("cnx_token"); setToken(null); setUser(null); }
  }, []);

  useEffect(() => {
    let t: string | null = null;
    try { t = sessionStorage.getItem("cnx_token"); } catch { /* storage unavailable */ }
    (t ? load(t) : Promise.resolve()).finally(() => setReady(true));
  }, [load]);

  const login = async (email: string, password: string) => {
    const r = await api<{ token: string }>("/auth/login", { method: "POST", body: { email, password } });
    sessionStorage.setItem("cnx_token", r.token);
    await load(r.token);
  };
  const logout = () => { sessionStorage.removeItem("cnx_token"); setToken(null); setUser(null); };
  const refresh = async () => { if (token) await load(token); };

  return <C.Provider value={{ user, token, ready, login, logout, refresh, setUser }}>{children}</C.Provider>;
}
