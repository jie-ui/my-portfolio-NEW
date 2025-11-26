// src/auth/authContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import http from "@/api/http";

const AuthCtx = createContext(null);

export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const signin = async (email, password) => {
    const { data } = await http.post("/auth/signin", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role || "user"); 
    setToken(data.token);

    try {
      const me = await http.get("/profile/me");
      localStorage.setItem("user", JSON.stringify(me.data.data));
      setUser(me.data.data);
    } catch {
      const fallbackUser = { role: data.role || "user" }; 
      localStorage.setItem("user", JSON.stringify(fallbackUser));
      setUser(fallbackUser);
    }
  };

  const signup = async (payload) => {
    await http.post("/auth/signup", payload);
  };

  const signout = async () => {
    try { await http.post("/auth/signout"); } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    const ru = localStorage.getItem("user");
    if (t && ru && !user) {
      setToken(t);
      setUser(JSON.parse(ru));
    }
  }, [user]); 
  return (
    <AuthCtx.Provider value={{ token, user, signin, signup, signout }}>
      {children}
    </AuthCtx.Provider>
  );
}