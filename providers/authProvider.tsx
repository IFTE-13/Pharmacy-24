"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  address: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        console.log("AuthProvider: Fetching user");
        const res = await fetch("/api/auth/user", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          console.log("AuthProvider: Fetched user:", data);
          setUser(data);
        } else {
          console.log("AuthProvider: No user data, status:", res.status);
          setUser(null);
        }
      } catch (error) {
        console.error("AuthProvider: Error fetching user:", error);
        setUser(null);
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      console.log("AuthProvider: Logging out");
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      setUser(null);
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("AuthProvider: Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}