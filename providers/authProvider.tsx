"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Checking authentication status");
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      // Check if token cookie exists by making a preliminary request
      const checkResponse = await fetch("/api/auth/check-token", {
        credentials: "include",
      });
      if (!checkResponse.ok) {
        console.log("AuthProvider: No valid token found, skipping user fetch");
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("AuthProvider: Fetching user data");
      const res = await fetch("/api/auth/user", {
        credentials: "include",
      });
      if (res.ok) {
        const userData = await res.json();
        console.log("AuthProvider: User data fetched:", userData);
        setUser(userData);
      } else {
        let errorData;
        try {
          errorData = await res.json();
        } catch (e) {
          errorData = { error: `Non-JSON response, status: ${res.status}` };
        }
        console.error("AuthProvider: Failed to fetch user:", errorData);
        setUser(null);
      }
    } catch (error) {
      console.error("AuthProvider: Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    console.log("AuthProvider: Logging in with user:", userData);
    setUser(userData);
  };

  const logout = async () => {
    console.log("AuthProvider: Logging out");
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        console.log("AuthProvider: Logout successful");
      } else {
        console.error("AuthProvider: Logout failed:", await res.json());
      }
    } catch (error) {
      console.error("AuthProvider: Logout error:", error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};