import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import brand from '@/public/brand.png'
import Image from 'next/image'

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto container space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">Trusted by our customers</h2>
                    <p>
                        Pharmacy 24 is more than just an online pharmacy – it’s a reliable partner in your 
                        health journey. Here’s what our happy customers have to say about their experience.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
                        <CardHeader>
                            <Image
                                className="w-fit dark:invert"
                                src={brand}
                                alt="Red Cross Logo"
                                height="40"
                                width="40"
                            />
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">
                                    Pharmacy 24 has completely simplified how I order medicines. 
                                    Their delivery is fast, and I never have to worry about stockouts. 
                                    It’s convenient, affordable, and reliable!
                                </p>
                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Sadia Rahman"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>SR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Sadia Rahman</cite>
                                        <span className="text-muted-foreground block text-sm">Regular Customer</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">
                                    Excellent service! My prescriptions are always delivered on time, 
                                    and the support team answers all my queries with care.
                                </p>
                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Ahmed Karim"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>AK</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Ahmed Karim</cite>
                                        <span className="text-muted-foreground block text-sm">Entrepreneur</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>
                                    The best online pharmacy experience I’ve had so far. 
                                    Easy ordering process, clear instructions, and trusted medicines.
                                </p>
                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Mahbub Hasan"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>MH</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Mahbub Hasan</cite>
                                        <span className="text-muted-foreground block text-sm">University Student</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="card variant-mixed">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>
                                    Pharmacy 24 gives me peace of mind knowing I can get genuine medicines 
                                    delivered to my doorstep. Their discounts are also a big plus!
                                </p>
                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Nabila Chowdhury"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>NC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">Nabila Chowdhury</p>
                                        <span className="text-muted-foreground block text-sm">Healthcare Worker</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
