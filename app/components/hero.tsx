import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import {
  Ambulance,
  Bandage,
  Brain,
  ChevronRight,
  Fingerprint,
  HeartPulse,
  Microscope,
  Ribbon,
  Stethoscope,
  LucideIcon,
} from 'lucide-react'
import { brandName } from '@/constant'

export default function Hero() {
  const icons: LucideIcon[] = [
    Ambulance,
    Bandage,
    Brain,
    HeartPulse,
    Microscope,
    Stethoscope,
    Fingerprint,
    Ribbon,
  ]

  return (
    <div className="py-24">
      <div className="mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
          <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl">
            Your Trusted Online Pharmacy
          </h1>
          <p className="mt-8 max-w-2xl text-balance text-lg">
            Get genuine medicines, health products, and wellness essentials
            delivered to your doorstep — safe, fast, and reliable with {brandName}.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full pl-5 pr-3 text-base"
            >
              <Link href="/shop">
                <span className="text-nowrap">Shop Now</span>
                <ChevronRight className="ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5"
            >
              <Link href="/contact">
                <span className="text-nowrap">Request Support</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Icons Slider */}
      <section className="bg-background pt-12">
        <div className="group relative container m-auto px-6">
          <div className="relative py-6">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {icons.map((Icon, idx) => (
                <div key={idx} className="flex">
                  <Icon className="size-10 text-primary" />
                </div>
              ))}
            </InfiniteSlider>

            {/* Edge fades */}
            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
