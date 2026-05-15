"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SidebarSlider from "@/components/SidebarSlider"
import { Settings, Edit } from "lucide-react"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [menuBgColor, setMenuBgColor] = useState("#FAFAFA")
  const router = useRouter()

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

  const crossColor = "#000000";

  const handleMenuLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string, color: string) => {
    event.preventDefault()

    setMenuBgColor(color)

    window.setTimeout(() => {
      setIsSidebarOpen(false)
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
      >
        <div className="relative w-8 h-6 md:w-14 md:h-12 overflow-hidden">
          {/* Absolute bars for precise centering when transformed (no window usage) */}
          <span
            className={`absolute left-0 right-0 bg-black transition-all duration-200 ${isSidebarOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[22%]'} h-[3px] md:h-[5px]`}
            style={{ backgroundColor: crossColor }}
          />
          <span
            className={`absolute left-0 right-0 bg-black transition-all duration-150 top-1/2 -translate-y-1/2 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'} h-[3px] md:h-[5px]`}
            style={{ backgroundColor: crossColor }}
          />
          <span
            className={`absolute left-0 right-0 bg-black transition-all duration-200 ${isSidebarOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[78%]'} h-[3px] md:h-[5px]`}
            style={{ backgroundColor: crossColor }}
          />
        </div>
      </button>

      <SidebarSlider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <div 
          className="fixed inset-0 w-screen h-screen flex flex-col p-8 md:p-16 uppercase transition-colors duration-700 ease-in-out"
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
                <div className="hidden md:block opacity-0 group-hover:opacity-30 transition-opacity font-mono font-black text-[9px] tracking-widest text-black uppercase">
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