"use client"

import { useState, useEffect } from "react"
import SidebarSlider from "@/components/SidebarSlider"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [menuBgColor, setMenuBgColor] = useState("#FAFAFA")

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const menuLinks = [
    { label: "Home", href: "/home", code: "00", color: "#FAFAFA" },
    { label: "About", href: "/about", code: "01", color: "#C3F380" },
    { label: "Contact", href: "/contact", code: "02", color: "#FF97D0" },
    { label: "Settings", href: "/settings", code: "ST", color: "#A0C4FF" },
    { label: "Admin", href: "/admin", code: "AD", color: "#B0B0B0" },
    { label: "Project 1", href: "/project-1", code: "P1", color: "#FAE170" },
    { label: "Project 2", href: "/project-2", code: "P2", color: "#D13F13" },
    { label: "Project 3", href: "/project-3", code: "P3", color: "#7523B4" },
  ];

  const crossColor = isSidebarOpen ? "#000000" : "#FF97D0";

  return (
    <>
      {/* Hamburger / Close Toggle Button */}
      <button
        className="fixed top-6 left-6 z-[110] flex items-center group focus:outline-none mix-blend-difference"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        <div className="relative w-8 h-6 flex flex-col justify-between overflow-hidden">
          <span 
            className={`w-full h-[3px] transition-all duration-500 ease-in-out origin-center ${
              isSidebarOpen ? 'rotate-45 translate-y-[10.5px]' : 'group-hover:translate-x-2'
            }`}
            style={{ backgroundColor: crossColor }}
          ></span>
          <span 
            className={`w-full h-[3px] transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'opacity-0 -translate-x-full' : 'group-hover:-translate-x-2'
            }`}
            style={{ backgroundColor: crossColor }}
          ></span>
          <span 
            className={`w-full h-[3px] transition-all duration-500 ease-in-out origin-center ${
              isSidebarOpen ? '-rotate-45 -translate-y-[10.5px]' : 'group-hover:translate-x-1'
            }`}
            style={{ backgroundColor: crossColor }}
          ></span>
        </div>
      </button>

      <SidebarSlider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <div 
          className="fixed inset-0 w-screen h-screen flex flex-col p-8 md:p-16 uppercase transition-colors duration-700 ease-in-out"
          style={{ backgroundColor: menuBgColor }}
        >
          {/* ESC Button */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-6 right-8 font-mono text-[10px] font-bold border-b border-black tracking-tighter hover:bg-black hover:text-white px-2 py-1 transition-all text-black"
          >
            CLOSE_SYSTEM [ESC]
          </button>
          
          {/* Menu Header - INDEX veranderd naar MENU en subtitel verwijderd */}
          <div className="flex justify-between items-end border-b border-black pb-4 mb-8 md:mb-10">
            <h2 className="font-mono text-xs font-bold tracking-widest text-black">MENU</h2>
          </div>

          {/* Navigation Links in 2 kolommen */}
          <nav
            className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow max-w-5xl"
            style={{ alignItems: 'start' }}
          >
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                onMouseEnter={() => setMenuBgColor(link.color)}
                onMouseLeave={() => setMenuBgColor("#FAFAFA")}
                className="group flex items-center justify-between py-0.5 md:py-1 border-b border-black/10 transition-all duration-300"
              >
                <div className="flex items-center gap-8 text-black">
                  <span className="font-mono text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">
                    {link.code}
                  </span>
                  <span className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter leading-none transition-all group-hover:pl-4">
                    {link.label}
                  </span>
                </div>
                <div className="hidden md:block opacity-0 group-hover:opacity-30 transition-opacity font-mono text-[9px] tracking-widest text-black">
                  {link.label === 'Project 1' ? 'leporello' :
                   link.label === 'Project 2' ? 'FIBONACCI' :
                   link.label === 'Project 3' ? 'Acoustic Laptop' :
                   ''}
                </div>
              </a>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="mt-auto flex flex-col md:flex-row justify-between items-end gap-4 font-mono text-[10px] border-t border-black pt-8 text-black">
            <div className="flex flex-col gap-1">
              <span className="font-bold uppercase tracking-widest">Lisa Marie Van Avermaet</span>
              <span className="opacity-50 lowercase tracking-tighter">Selected Works / Archive 2026</span>
            </div>
            <div className="text-right opacity-50">
              <span>EST. Hamme, BE</span>
            </div>
          </div>
        </div>
      </SidebarSlider>
    </>
  )
}