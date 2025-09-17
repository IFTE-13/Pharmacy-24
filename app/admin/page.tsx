"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/authProvider";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  company: string;
  created_at: string;
}

interface Transaction {
  id: number;
  user_id: number;
  email: string;
  amount: number;
  description: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [profileForm, setProfileForm] = useState({ name: "", phone: "", address: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [productForm, setProductForm] = useState({ id: 0, name: "", price: 0, company: "" });
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  useEffect(() => {
    console.log("AdminDashboard: user =", user, "loading =", loading);
    if (!loading && !user) {
      console.log("AdminDashboard: No user found, redirecting to /login");
      redirect("/login");
    }
    if (!loading && user && user.role !== "admin") {
      console.log("AdminDashboard: Non-admin user, redirecting to /profile");
      redirect("/profile");
    }
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      fetchUsers();
      fetchProducts();
      fetchTransactions();
    }
  }, [user, loading]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch("/api/users", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        console.log("AdminDashboard: Users fetched:", data);
        setUsers(data);
      } else {
        const errorData = await res.json();
        console.error("AdminDashboard: Failed to fetch users:", errorData);
        toast.error(errorData.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("AdminDashboard: Error fetching users:", error);
      toast.error("An error occurred while fetching users");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await fetch("/api/products", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        console.log("AdminDashboard: Products fetched:", data);
        setProducts(data);
      } else {
        const errorData = await res.json();
        console.error("AdminDashboard: Failed to fetch products:", errorData);
        toast.error(errorData.error || "Failed to fetch products");
      }
    } catch (error) {
      console.error("AdminDashboard: Error fetching products:", error);
      toast.error("An error occurred while fetching products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const res = await fetch("/api/transactions/all", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        console.log("AdminDashboard: Transactions fetched:", data);
        setTransactions(data);
      } else {
        const errorData = await res.json();
        console.error("AdminDashboard: Failed to fetch transactions:", errorData);
        toast.error(errorData.error || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("AdminDashboard: Error fetching transactions:", error);
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
        console.log("AdminDashboard: Profile updated:", updatedUser);
        toast.success("Profile updated successfully");
        const authRes = await fetch("/api/auth/user", { credentials: "include" });
        if (authRes.ok) {
          const userData = await authRes.json();
        }
      } else {
        const data = await res.json();
        console.error("AdminDashboard: Update failed:", data);
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("AdminDashboard: Update error:", error);
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
        console.log("AdminDashboard: Password changed successfully");
        toast.success("Password changed successfully");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const data = await res.json();
        console.error("AdminDashboard: Password change failed:", data);
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      console.error("AdminDashboard: Password change error:", error);
      toast.error("An error occurred while changing password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditingProduct ? "/api/products" : "/api/products";
      const method = isEditingProduct ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`AdminDashboard: Product ${isEditingProduct ? "updated" : "created"}:`, data);
        toast.success(`Product ${isEditingProduct ? "updated" : "created"} successfully`);
        fetchProducts();
        setProductForm({ id: 0, name: "", price: 0, company: "" });
        setIsEditingProduct(false);
      } else {
        const data = await res.json();
        console.error(`AdminDashboard: Product ${isEditingProduct ? "update" : "create"} failed:`, data);
        toast.error(data.error || `Failed to ${isEditingProduct ? "update" : "create"} product`);
      }
    } catch (error) {
      console.error("AdminDashboard: Product error:", error);
      toast.error(`An error occurred while ${isEditingProduct ? "updating" : "creating"} product`);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductForm({ id: product.id, name: product.name, price: product.price, company: product.company });
    setIsEditingProduct(true);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });
      if (res.ok) {
        console.log("AdminDashboard: Product deleted:", id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        const data = await res.json();
        console.error("AdminDashboard: Product deletion failed:", data);
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("AdminDashboard: Product deletion error:", error);
      toast.error("An error occurred while deleting product");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-32">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>View all registered users</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingUsers ? (
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : users.length === 0 ? (
                <p className="text-center text-muted-foreground">No users found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name || "N/A"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.phone || "N/A"}</TableCell>
                        <TableCell>{user.address || "N/A"}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage products</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSubmit} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Name</Label>
                    <Input
                      id="productName"
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="Product name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      type="text"
                      value={productForm.company}
                      onChange={(e) => setProductForm({ ...productForm, company: e.target.value })}
                      placeholder="Company"
                      required
                    />
                  </div>
                </div>
                <Button type="submit">
                  {isEditingProduct ? "Update Product" : "Add Product"}
                </Button>
                {isEditingProduct && (
                  <Button variant="outline" onClick={() => setIsEditingProduct(false)}>
                    Cancel Edit
                  </Button>
                )}
              </form>
              {isLoadingProducts ? (
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : products.length === 0 ? (
                <p className="text-center text-muted-foreground">No products found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.company}</TableCell>
                        <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View all transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTransactions ? (
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : transactions.length === 0 ? (
                <p className="text-center text-muted-foreground">No transactions found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.user_id}</TableCell>
                        <TableCell>{transaction.email}</TableCell>
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}