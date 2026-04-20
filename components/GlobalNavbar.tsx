"use client"

import Link from 'next/link'

export default function GlobalNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm" style={{fontFamily: 'Georgia, Times, serif'}}>
      <div className="w-full px-8 pr-16 py-4 flex items-center justify-end">
        
        {/* Logo / titel verwijderd */}

        {/* Horizontale navigatie gecentreerd */}
        <div className="flex space-x-6 justify-end">
          <Link href="/" className="text-black hover:text-gray-700 transition-colors">Home</Link>
          {/* Test link removed from navigation; page remains available by direct URL. */}
          <Link href="/about" className="text-black hover:text-gray-700 transition-colors">About</Link>
          <Link href="/project" className="text-black hover:text-orange-500 transition-colors">Leporello</Link>
          <Link href="/project2" className="text-black hover:text-cyan-600 transition-colors">Fibonacci</Link>
          <Link href="/project3" className="text-black hover:text-purple-600 transition-colors">Acoustic Laptop</Link>
          <Link href="/contact" className="text-black hover:text-gray-700 transition-colors">Contact</Link>
          <Link
            href="/admin-user"
            aria-label="Profile"
            title="Profile"
            className="text-white bg-black p-2 rounded hover:bg-red-600 hover:text-white transition-colors inline-flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4.5 20C5.6 16.9 8.5 15 12 15C15.5 15 18.4 16.9 19.5 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
          <Link
            href="/admin"
            aria-label="Admin"
            title="Admin"
            className="text-white bg-black p-2 rounded hover:bg-red-600 hover:text-white transition-colors inline-flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
              <path d="M12 3.6V6.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M12 17.9V20.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M20.4 12H17.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M6.1 12H3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M17.9 6.1L16.2 7.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M7.8 16.2L6.1 17.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M17.9 17.9L16.2 16.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M7.8 7.8L6.1 6.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="12" cy="12" r="5.2" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>
        </div>

      </div>
    </nav>
  )
}
