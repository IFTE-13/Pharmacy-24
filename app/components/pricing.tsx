import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { IPlanProps, plans } from "@/data";
import { brandName } from "@/constant";

function PricingCard({ plan }: { plan: IPlanProps }) {
  return (
    <Card className="relative flex flex-col">
      {plan.popular && (
        <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
          Popular
        </span>
      )}

      <CardHeader>
        <CardTitle className="font-medium">{plan.name}</CardTitle>
        <span className="my-3 block text-2xl font-semibold">{plan.price}</span>
        <CardDescription className="text-sm">{plan.description}</CardDescription>
        <Button
          asChild
          variant={plan.variant ?? "default"}
          className="mt-4 w-full"
        >
          <Link href="/login">Get Started</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <hr className="border-dashed" />
        <ul className="list-outside space-y-3 text-sm">
          {plan.features.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="size-3" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function Pricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-semibold lg:text-5xl">
            Affordable Plans for Every Need
          </h1>
          <p>
            At {brandName}, we believe healthcare should be simple and accessible. 
            Choose a plan that fits your lifestyle and enjoy reliable access to 
            medicines, health products, and dedicated support anytime you need it.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

