export interface IPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  variant?: "default" | "outline";
};

export const plans: IPlanProps[] = [
  {
    name: "Regular Delivery",
    price: "$3 / Delivery",
    description: "Get your package at a standard pace with affordable rates",
    features: [
        "Delivery within 3-5 days", 
        "Tracking available", 
        "Customer support",
    ],
    variant: "outline",
  },
  {
    name: "Fast Delivery",
    price: "$7 / Delivery",
    description: "Priority handling for urgent packages, reaching you in record time",
    features: [
      "Delivery within 3-5 days",
      "Tracking available",
      "Customer support",
      "Real-time location updates",
      "Free weekend delivery",
    ],
    popular: true,
  },
  {
    name: "Express Delivery",
    price: "$15 / Delivery",
    description: "Ultra-fast service for critical packages delivered within an hour",
    features: [
        "Delivery within 1 hour", 
        "Tracking available", 
        "Customer support",
        "Real-time location updates",
        "Free weekend delivery"
    ],
    variant: "outline",
  },
];