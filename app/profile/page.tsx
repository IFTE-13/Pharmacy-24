"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/authProvider";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Transaction {
  id: number;
  amount: number;
  description: string;
  created_at: string;
}

export default function Profile() {
  const { user, loading } = useAuth();
  const [profileForm, setProfileForm] = useState({ name: "", phone: "", address: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  useEffect(() => {
    console.log("Profile: user =", user, "loading =", loading);
    if (!loading && !user) {
      console.log("Profile: No user found, redirecting to /login");
      redirect("/login");
    }
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      fetchTransactions();
    }
  }, [user, loading]);

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const res = await fetch("/api/transactions", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        console.log("Profile: Transactions fetched:", data);
        setTransactions(data);
      } else {
        const errorData = await res.json();
        console.error("Profile: Failed to fetch transactions:", errorData);
        toast.error(errorData.error || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Profile: Error fetching transactions:", error);
      toast.error("An error occurred while fetching transactions");
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
        credentials: "include",
      });
      if (res.ok) {
        const updatedUser = await res.json();
        console.log("Profile: Profile updated:", updatedUser);
        toast.success("Profile updated successfully");
        // Update AuthProvider user state via a refresh
        const authRes = await fetch("/api/auth/user", { credentials: "include" });
        if (authRes.ok) {
          const userData = await authRes.json();
          // Assuming AuthProvider will handle state update via fetchUser
        }
      } else {
        const data = await res.json();
        console.error("Profile: Update failed:", data);
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile: Update error:", error);
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
        credentials: "include",
      });
      if (res.ok) {
        console.log("Profile: Password changed successfully");
        toast.success("Password changed successfully");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const data = await res.json();
        console.error("Profile: Password change failed:", data);
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Profile: Password change error:", error);
      toast.error("An error occurred while changing password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-32">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1 className="text-3xl font-semibold mb-8">Your Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (read-only)</Label>
                <Input id="email" type="email" value={user?.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  placeholder="Your address"
                />
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Changing...</> : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Transactions Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingTransactions ? (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border-b pb-2">
                    <p className="font-medium">${transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}