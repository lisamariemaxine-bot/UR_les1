"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { label: "Start", href: "/home" },
  { label: "Project 1", href: "/project-1" },
  { label: "Project 2", href: "/project-2" },
  { label: "Project 3", href: "/project-3" },
  { label: "Project 4", href: "/project-4" },
  { label: "Over mij", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function GlobalNavbar() {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-[10000] h-16 border-b border-black/10 bg-white text-black">
      <nav aria-label="Hoofdnavigatie" className="flex h-full items-center gap-5 overflow-x-auto px-4 md:justify-end md:gap-8 md:px-8">
        {links.map(({ label, href }) => {
          const active = pathname === href || (href === "/home" && pathname === "/")
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 border-b-2 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:border-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${active ? "border-black" : "border-transparent"}`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
