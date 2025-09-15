import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import * as React from 'react'
import brand from '@/public/brand.png'

export default function Products() {
    const products = [
        {
            name: 'Paracetamol 500mg',
            company: 'PharmaCare',
            price: '$5.99',
            image: '/medicines/paracetamol.jpg',
        },
        {
            name: 'Amoxicillin 250mg',
            company: 'HealthPlus',
            price: '$12.49',
            image: '/medicines/amoxicillin.jpg',
        },
        {
            name: 'Aspirin 100mg',
            company: 'MediLife',
            price: '$4.50',
            image: '/medicines/aspirin.jpg',
        },
        {
            name: 'Vitamin C Tablets',
            company: 'NutriHealth',
            price: '$8.75',
            image: '/medicines/vitamin-c.jpg',
        },
        {
            name: 'Ibuprofen 400mg',
            company: 'CareWell',
            price: '$9.99',
            image: '/medicines/ibuprofen.jpg',
        },
        {
            name: 'Antacid Syrup',
            company: 'DigestiveCare',
            price: '$6.80',
            image: '/medicines/antacid.jpg',
        },
        {
            name: 'Ibuprofen 400mg',
            company: 'CareWell',
            price: '$9.99',
            image: '/medicines/ibuprofen.jpg',
        },
        {
            name: 'Antacid Syrup',
            company: 'DigestiveCare',
            price: '$6.80',
            image: '/medicines/antacid.jpg',
        },
        {
            name: 'Ibuprofen 400mg',
            company: 'CareWell',
            price: '$9.99',
            image: '/medicines/ibuprofen.jpg',
        },
        {
            name: 'Antacid Syrup',
            company: 'DigestiveCare',
            price: '$6.80',
            image: '/medicines/antacid.jpg',
        },
    ]

    return (
        <section>
            <div className="">
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Our Medicines</h2>
                        <p className="text-muted-foreground mt-6">Browse from our wide collection of trusted medicines.</p>
                    </div>

                    <div className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {products.map((product, index) => (
                            <ProductCard
                                key={index}
                                name={product.name}
                                company={product.company}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const ProductCard = ({
    name,
    company,
    price,
    image,
}: {
    name: string
    company: string
    price: string
    image: string
}) => {
    return (
        <Card className="p-4">
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                    src={brand}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold h-16">{name}</h3>
                <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                    <span>{company}</span>
                    <span className="font-medium text-foreground">{price}</span>
                </div>
                <Button className="w-full mt-4">Add to Cart</Button>
            </div>
        </Card>
    )
}
