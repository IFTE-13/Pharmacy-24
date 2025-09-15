import CallToAction from "./components/cta";
import { FAQAccordion } from "./components/faq";
import Hero from "./components/hero";
import Pricing from "./components/pricing";
import Stats from "./components/stats";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <>
      <Hero/>
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
