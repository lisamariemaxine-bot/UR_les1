"use client"

import Link from 'next/link'

export default function GlobalNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 border-b shadow-sm shine-animation">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / titel (optioneel) */}
        <div className="text-lg font-semibold">
          MySite
        </div>

        {/* Horizontale navigatie */}
        <div className="flex space-x-6">
          <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/project" className="hover:underline">Project leperello</Link>
          <Link href="/project2" className="hover:underline">project BOEM</Link>
          <Link href="/project3" className="hover:underline">project poster</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          
        </div>

      </div>
    </nav>
  )
}
