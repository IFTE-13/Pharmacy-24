"use client";

import { useAuth } from "@/providers/authProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("Dashboard: user =", user, "loading =", loading);
    if (!loading && !user) {
      console.log("Dashboard: No user found, redirecting to /login");
      redirect("/login");
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-32">
      <h1 className="text-3xl font-semibold">Welcome, {user?.name || user?.email}!</h1>
      <p className="mt-4">Your role: {user?.role}</p>
    </div>
  );
}