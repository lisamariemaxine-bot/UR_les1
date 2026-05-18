"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import SidebarSlider from "@/components/SidebarSlider"
import { Settings, Edit } from "lucide-react"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [menuBgColor, setMenuBgColor] = useState("#FAFAFA")
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/home'

  useEffect(() => {
    if (isSidebarOpen) {
      setMenuBgColor("#FAFAFA")
    }
  }, [isSidebarOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const menuLinks = [
    { label: "Home", href: "/home", code: "00", color: "#FF97D0" },
    { label: "Project 1", href: "/project-1", code: "P1", color: "#125603" },
    { label: "Project 2", href: "/project-2", code: "P2", color: "#C3F380" },
    { label: "Project 3", href: "/project-3", code: "P3", color: "#FAE170" },
    { label: "About Me", href: "/about", code: "01", color: "#FDC5C6" },
    { label: "Contact", href: "/contact", code: "02", color: "#C3F380" },
    { label: "Admin", href: "/admin", code: "ST", color: "#A0C4FF" },
    { label: "Settings", href: "/settings", code: "AD", color: "#B0B0B0" },
  ];

  const crossColor = isSidebarOpen ? "#000000" : (isHome ? "#FFFFFF" : "#000000");

  const handleMenuLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string, color: string) => {
    event.preventDefault()

    setMenuBgColor(color)

    window.setTimeout(() => {
      setIsSidebarOpen(false)
      // show a full-screen overlay with the link color to hide the old page during navigation
      try {
        const existing = document.getElementById('nav-overlay')
        if (existing) existing.remove()
        const overlay = document.createElement('div')
        overlay.id = 'nav-overlay'
        overlay.style.position = 'fixed'
        overlay.style.inset = '0'
        overlay.style.background = color
        overlay.style.zIndex = '9998'
        overlay.style.transition = 'opacity 0.2s ease'
        document.body.appendChild(overlay)
      } catch (e) {
        // ignore server-side or DOM errors
      }
      router.push(href)
    }, 260)
  }

  const handleToggleMenu = () => {
    if (!isSidebarOpen) {
      setMenuBgColor("#FAFAFA")
    }
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {/* Hamburger / Close Toggle Button */}
      <button
        className="fixed top-6 left-6 z-[110] flex items-center group focus:outline-none"
        onClick={handleToggleMenu}
        aria-label="Toggle Menu"
        style={{
          backgroundColor: isHome && !isSidebarOpen ? '#000000' : 'transparent',
          padding: isHome && !isSidebarOpen ? '8px' : undefined,
          borderRadius: isHome && !isSidebarOpen ? '0px' : undefined,
        }}
      >
        <div className="relative w-7 h-5 md:w-12 md:h-10 overflow-hidden">
          <div className="flex flex-col justify-between h-full">
            <span
              className={`block w-full h-[3px] md:h-[5px] transition-all duration-200 ${isSidebarOpen ? 'absolute left-0 right-0 top-1/2 -translate-y-1/2 rotate-45' : ''}`}
              style={{ backgroundColor: crossColor }}
            />
            <span
              className={`block w-full h-[3px] md:h-[5px] transition-opacity duration-150 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ backgroundColor: crossColor }}
            />
            <span
              className={`block w-full h-[3px] md:h-[5px] transition-all duration-200 ${isSidebarOpen ? 'absolute left-0 right-0 top-1/2 -translate-y-1/2 -rotate-45' : ''}`}
              style={{ backgroundColor: crossColor }}
            />
          </div>
        </div>
      </button>

      <SidebarSlider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <div 
          className="fixed inset-0 w-screen min-h-[100dvh] flex flex-col p-8 md:p-16 uppercase transition-colors duration-700 ease-in-out"
          style={{ backgroundColor: menuBgColor }}
        >
          {/* Menu Header - INDEX veranderd naar MENU en subtitel verwijderd */}
          <div className="flex justify-between items-end border-b border-black pb-4 mb-8 md:mb-10">
            <h2 className="ml-0 md:ml-12 font-mono text-sm md:text-base font-bold tracking-widest text-black">MENU</h2>
          </div>

          {/* Navigation Links in 2 kolommen */}
          <nav
            className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow max-w-5xl md:pl-12"
            style={{ alignItems: 'start' }}
          >
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleMenuLinkClick(event, link.href, link.color)}
                onMouseEnter={() => setMenuBgColor(link.color)}
                onMouseLeave={() => setMenuBgColor("#FAFAFA")}
                className="group flex items-center justify-between py-0.5 md:py-1 border-b border-black/10 transition-all duration-300"
              >
                <div className="flex items-center text-black">
                  {/* conditional icon for Admin and Settings */}
                  {link.label === 'Admin' && (
                    <span className="mr-3">
                      <Edit size={24} />
                    </span>
                  )}
                  {link.label === 'Settings' && (
                    <span className="mr-3">
                      <Settings size={24} />
                    </span>
                  )}
                  <span className="text-3xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter leading-none transition-all group-hover:pl-4">
                    {link.label}
                  </span>
                </div>
                <div
                  className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-3 group-hover:scale-105 font-mono font-black text-[9px] tracking-widest uppercase text-black"
                >
                  {link.label === 'Project 1' ? 'leporello' :
                   link.label === 'Project 2' ? 'FIBONACCI' :
                   link.label === 'Project 3' ? 'Acoustic Laptop' :
                   ''}
                </div>
              </a>
            ))}
          </nav>

        </div>
      </SidebarSlider>
    </>
  )
}