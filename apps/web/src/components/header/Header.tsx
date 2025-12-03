'use client'

import Image from "next/image"
import Link from "next/link"
import SearchBar from "@/components/header/SearchBar"
import ProfileDropdown from "@/components/header/ProfileDropdown"
import HeaderCart from "./HeaderCart"
import HeaderWishlist from "./HeaderWishlist"
import HeaderNotifciation from "./HeaderNotifciation"
import { usePathname } from "next/navigation"
import { headerlessRoutes } from "@/constants/headerlessRoutes"

const Header = () => {
   const pathname = usePathname()
  
   const hide = headerlessRoutes.some(route =>
    pathname?.startsWith(route)
  )

  if (hide) return null

  return (
    <header className="w-full flex items-center gap-6 px-6 py-3 bg-background border-b border-border">
      <Link href="/" className="flex items-center hover:opacity-80 transition">
        <Image
          src="/training.png"
          alt="LearningLounge Logo"
          width={48}
          height={48}
          className="rounded-lg shadow-elegant"
        />
      </Link>
        <Link
          href="/"
          className="text-sm font-medium hover:text-primary transition"
        >
          Explore
        </Link>
      <div className="flex-1">
        <SearchBar />
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium hover:text-primary transition"
        >
          Plans & Pricing
        </Link>

        <Link
          href="/tutor"
          className="text-sm font-medium hover:text-primary transition"
        >
          Instructor
        </Link>

        <Link
          href="/dashboard"
          className="text-sm font-medium hover:text-primary transition"
        >
          My Learning
        </Link>
      </nav>

      <div className="flex items-center gap-5">
        <HeaderWishlist />
        <HeaderNotifciation />
        <HeaderCart />
        <ProfileDropdown />
      </div>
    </header>
  )
}

export default Header
