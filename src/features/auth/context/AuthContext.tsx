import React, { createContext, useEffect, useMemo, useState } from "react";
import type { AuthUser, LoginResponse } from "../../../types/auth";
import { authApi } from "../../../api/authApi";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;
 // if we had token we should be already logged in
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const me = await authApi.me();
        setUser(me);
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

 // send login request and store token 
  const login = async (email: string, password: string) => {
    const res: LoginResponse = await authApi.login({ email, password });
    localStorage.setItem("token", res.token);
    setUser(res.user);
  };
   // logout and remove token from local storage
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  
  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, logout }),
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
