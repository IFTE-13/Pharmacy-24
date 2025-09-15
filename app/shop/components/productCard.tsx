"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/providers/cartContext";
import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  name: string;
  company: string;
  price: number;
}

export function ProductCard({ id, name, company, price }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    addToCart({ id, name, company, price });
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-sm truncate">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{company}</p>
        <p className="text-lg font-semibold">${price}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}