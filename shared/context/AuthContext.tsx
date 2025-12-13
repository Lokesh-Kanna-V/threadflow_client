"use client";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  user: any | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  user: null,
  setAccessToken: () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAccessToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
