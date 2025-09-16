"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/authProvider";
import { redirect } from "next/navigation";
import CallToAction from "./components/cta";
import { FAQAccordion } from "./components/faq";
import Hero from "./components/hero";
import Pricing from "./components/pricing";
import Stats from "./components/stats";
import Testimonials from "./components/testimonials";

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("Home: user =", user, "loading =", loading);
    if (!loading && user) {
      console.log("Home: User is authenticated, redirecting to /dashboard");
      redirect("/shop");
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Hero />
      <Stats />
      <Pricing />
      <Testimonials />
      <div className="container mx-auto grid gap-12 px-6 md:grid-cols-2 md:gap-16">
        <CallToAction />
        <FAQAccordion />
      </div>
    </>
  );
}