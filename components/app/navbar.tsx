"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import brand from "@/public/brand.png";
import { brandName } from "@/constant";
import { AnimatedThemeToggler } from "@/components/ui/animatedThemeToggler";
import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Profile", href: "/profile" },
  { name: "Dashboard", href: "/admin" },
];

export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Navbar: Initiating logout");
    await logout();
    router.push("/");
    setTimeout(() => {
      console.log("Navbar: Fallback navigation to /");
      window.location.href = "/";
    }, 500);
  };

  const visibleMenuItems = menuItems.filter((item) => {
    if (loading) {
      return item.name === "Home" || item.name === "Shop";
    }
    if (!user) {
      return item.name === "Home" || item.name === "Shop";
    }
    if (user.role === "admin") {
      return item.name === "Dashboard";
    }
    return item.name === "Shop" || item.name === "Profile";
  });

  return (
    <header>
      <nav
        data-state={menuState ? "active" : "inactive"}
        className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur dark:bg-zinc-950/50 lg:dark:bg-transparent"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-4">
                <Image src={brand} width={40} height={40} alt="brand logo" />
                <span className="text-3xl">{brandName}</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:pr-4">
                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                  {visibleMenuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                {!loading && !user ? (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/register">
                        <span>Register</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login">
                        <span>Login</span>
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <span>Logout</span>
                  </Button>
                )}
                <div className="hidden md:block mt-1">
                  <AnimatedThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}