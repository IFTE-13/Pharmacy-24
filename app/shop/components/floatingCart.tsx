"use client";

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { useCart } from "@/providers/cartContext";
import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function FloatingCart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate total with proper currency formatting
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    if (!user && !loading) {
      console.log("FloatingCart: No user found, redirecting to /login");
      toast.error("Please log in to proceed with checkout");
      router.push("/login");
      return;
    }

    setIsModalOpen(true);
  };

  const confirmCheckout = async () => {
    try {
      const res = await fetch("/api/transactions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, total: parseFloat(total) }),
        credentials: "include",
      });

      if (res.ok) {
        console.log("FloatingCart: Transaction created successfully");
        toast.success("Checkout completed successfully!");
        clearCart();
        setOpen(false);
        setIsModalOpen(false);
      } else {
        const data = await res.json();
        console.error("FloatingCart: Checkout failed:", data);
        toast.error(data.error || "Failed to complete checkout");
      }
    } catch (error) {
      console.error("FloatingCart: Checkout error:", error);
      toast.error("An error occurred during checkout");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 bg-primary text-white dark:text-gray-900 p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Open cart with ${cart.length} items`}
      >
        <ShoppingCart className="h-6 w-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {cart.length}
          </span>
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full max-w-lg p-6">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Products
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearCart()}
                    className="text-red-500 hover:text-red-700 border-red-500"
                    aria-label="Clear all items from cart"
                  >
                    Clear Cart
                  </Button>
                </div>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2 gap-2"
                    >
                      <div className="flex-1 min-w-0 w-48">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 block truncate" title={item.name}>
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-900 dark:text-gray-100 w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-base font-semibold text-gray-900 dark:text-gray-100">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
          <Button
            className="w-full mt-6 bg-primary hover:bg-primary-dark font-semibold py-2 rounded-md"
            disabled={cart.length === 0}
            aria-disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </SheetContent>
      </Sheet>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Checkout</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed with the checkout? Your cart contains {cart.length} item(s) with a total of ${total}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCheckout}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}