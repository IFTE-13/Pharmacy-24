import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import {
  Brain,
  Fingerprint,
  HeartPulse,
  Ribbon,
  LucideIcon,
} from 'lucide-react'

export default function MonthlySubscription() {
    const icons: LucideIcon[] = [
        Brain,
        HeartPulse,
        Fingerprint,
        Ribbon,
      ]
    return (
        <div className="relative py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                        Affordable Monthly Medicine Delivery
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Get your essential medicines delivered to your doorstep every month. No more pharmacy runs — just reliable, on-time delivery.
                    </p>
                </div>

                <div className="mt-8 md:mt-20">
                    <div className="bg-card relative rounded-3xl border shadow-2xl shadow-zinc-950/5">
                        <div className="grid items-center gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
                            {/* Pricing Info */}
                            <div className="pb-12 text-center md:pb-0 md:pr-12">
                                <h3 className="text-2xl font-semibold">Monthly Subscription</h3>
                                <p className="mt-2 text-lg">For individuals & families</p>
                                <span className="mb-6 mt-12 inline-block text-6xl font-bold">
                                    <span className="text-4xl">$</span>99
                                    <span className="text-base font-medium text-muted-foreground">/month</span>
                                </span>

                                <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="#">Subscribe Now</Link>
                                    </Button>
                                </div>

                                <p className="text-muted-foreground mt-12 text-sm">
                                    Cancel anytime. Free delivery on all orders.
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="relative">
                                <ul role="list" className="space-y-4">
                                    {[
                                        'Free home delivery every month',
                                        'Personalized medicine reminders',
                                        'Access to certified pharmacists',
                                        'Exclusive discounts on health products',
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Check className="size-4 text-green-600" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-muted-foreground mt-6 text-sm">
                                    Trusted by thousands of families for safe and timely medicine delivery.
                                </p>

                                <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
                                    {icons.map((Icon, idx) => (
                                        <div key={idx} className="flex">
                                        <Icon className="size-10 text-primary" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
