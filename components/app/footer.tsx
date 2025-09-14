import brand from '@/public/brand.png'
import Image from 'next/image'
import Link from 'next/link'
import { brandName } from '@/constant';

const links = [
  { title: 'Home', href: '/' },
  { title: 'Shop', href: '/shop' },
  { title: 'Contact', href: '/contact' },
  { title: 'Login', href: '/login' },
]

export default function Footer() {
  return (
    <div className="container mx-auto p-6">
      <Link
        href="/"
        aria-label="go home"
        className="flex flex-col items-center justify-center mx-auto w-fit"
      >
        <Image
          src={brand}
          width={40}
          height={40}
          alt="brand logo"
        />
        <h1 className="text-3xl pt-3">{brandName}</h1>
      </Link>

      <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-muted-foreground hover:text-primary block duration-150"
          >
            <span>{link.title}</span>
          </Link>
        ))}
      </div>

      <span className="text-muted-foreground block text-center text-sm">
        © {new Date().getFullYear()} {brandName}, All rights reserved
      </span>
    </div>
  )
}
