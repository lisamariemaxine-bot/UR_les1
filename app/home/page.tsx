"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const fullText = "PORTFOLIO";
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789#%&*";

  const [displayedPortfolio, setDisplayedPortfolio] = useState(fullText);
  const [activeTextColor, setActiveTextColor] = useState('#000000');
  const [activeBookTitle, setActiveBookTitle] = useState<string | null>(null);
  const [hoveredLetters, setHoveredLetters] = useState<{ [key: number]: boolean }>({});
  const letterTimeouts = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const resetTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const offWhite = '#FAFAFA';
  const router = useRouter();
  const nameParts = ["VAN", "AVERMAET", "LISA MARIE"];
  const letterColors = ["#FF97D0", "#125603", "#C3F380", "#D13F13", "#FDC5C6"];

  const boeken = [
    { title: "HOME", href: "/home", code: "H.00", system: "MAIN INTERFACE", bgColor: "#FF97D0", textColor: "#125603" },
    { title: "PROJECT 1", href: "/project-1", code: "P.01", system: "LEPORELLO", bgColor: "#125603", textColor: "#C3F380" },
    { title: "PROJECT 2", href: "/project-2", code: "P.02", system: "FIBONACCI", bgColor: "#C3F380", textColor: "#7523B4" },
    { title: "PROJECT 3", href: "/project-3", code: "P.03", system: "ACOUSTIC LAPTOP", bgColor: "#FAE170", textColor: "#D13F13" },
    { title: "ABOUT ME", href: "/about", code: "AB.04", system: "ABOUT THE MAKER", bgColor: "#FDC5C6", textColor: "#D13F13" },
  ];

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedPortfolio(fullText.split("").map((l, i) => 
        i < iteration ? fullText[i] : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      if (iteration >= fullText.length) clearInterval(interval);
      iteration += 1 / 2.5; 
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      container.style.setProperty('--m-x', `${e.clientX}px`);
      container.style.setProperty('--m-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookHover = (boek: any) => {
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    setActiveBookTitle(boek.title);
    
    if (boek.title === "HOME") {
      setActiveTextColor(boek.textColor);
    } else {
      setActiveTextColor(boek.bgColor);
    }
  };

  const handleBookLeave = () => {
    resetTimeout.current = setTimeout(() => {
      setActiveTextColor('#000000');
      setActiveBookTitle(null);
    }, 150);
  };

  const handleBookClick = (boek: any) => {
    handleBookHover(boek);
    setTimeout(() => {
      if (boek.title === "HOME") {
        window.location.reload();
      } else if (boek.href) {
        router.push(boek.href);
      }
    }, 300);
  };

  const handleLetterActive = (globalIdx: number) => {
    if (letterTimeouts.current[globalIdx]) clearTimeout(letterTimeouts.current[globalIdx]);
    setHoveredLetters(prev => ({ ...prev, [globalIdx]: true }));
    letterTimeouts.current[globalIdx] = setTimeout(() => {
      setHoveredLetters(prev => ({ ...prev, [globalIdx]: false }));
    }, 1500);
  };

  let globalCharCounter = 0;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 h-[100dvh] w-full font-sans uppercase overflow-hidden select-none md:cursor-none" 
      style={{ backgroundColor: offWhite, ['--m-x' as any]: '0px', ['--m-y' as any]: '0px' }}
    >
      <div className="flex flex-col md:flex-row h-full w-full relative">
        
        {/* Linker sectie: Portfolio + Naam */}
        <div className="linkse-tekst w-full md:w-[40vw] lg:w-[45vw] h-[60dvh] md:h-full p-6 md:p-10 pb-20 md:pb-20 flex flex-col justify-end relative z-[60] pointer-events-none">
          <div className="leading-none w-full pointer-events-auto flex flex-col items-start gap-1 max-w-full">
            <div className="flex flex-col items-start relative max-w-fit w-full">
              <div className="inline-flex flex-col relative w-full">
                <h2 className="tracking-tighter font-black transition-colors duration-500 flex items-end justify-start" 
                    style={{ 
                      color: activeTextColor, 
                      fontSize: 'clamp(3.5rem, 15vw, 8rem)',
                      lineHeight: '0.85'
                    }}>
                  <span className="select-none">{displayedPortfolio}</span>
                </h2>
                <span className="gd-label font-serif italic font-light tracking-tight uppercase block z-30 absolute left-0 transition-colors duration-500" 
                      style={{ 
                        fontSize: 'clamp(1.2rem, 5vw, 2.8rem)',
                        color: activeTextColor,
                        textAlign: 'right',
                        right: '-10%',
                        width: '110%'
                      }}>
                  GRAPHIC DESIGN
                </span>
              </div>
            </div>

            <h1 className="font-black tracking-tighter leading-[0.9] text-left" 
                style={{ fontSize: 'clamp(2.5rem, 10vw, 4.8rem)' }}>
              {nameParts.map((part, partIdx) => (
                <span key={partIdx} className="block whitespace-nowrap">
                  {part.split("").map((char) => {
                    const currentIdx = globalCharCounter++;
                    return (
                      <span 
                        key={currentIdx}
                        onMouseEnter={() => handleLetterActive(currentIdx)}
                        className="transition-colors duration-200 inline-block cursor-default pointer-events-auto"
                        style={{ color: hoveredLetters[currentIdx] ? letterColors[currentIdx % letterColors.length] : '#000000' }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Rechter sectie: Boeken Menu */}
        <div className="w-full md:w-full h-full relative flex items-end md:items-center justify-start md:justify-end overflow-x-auto md:overflow-visible p-4 md:p-6 snap-x snap-mandatory no-scrollbar md:fixed md:top-0 md:right-0 z-10">
          <div className="relative flex items-end h-[60dvh] md:h-[85vh] lg:h-[90vh] min-w-max md:min-w-0 md:w-auto max-w-full justify-end pb-8 md:pb-0 md:pr-8">
            <div className="flex items-end gap-1.5 md:gap-2 px-6 md:px-0">
              {boeken.map((boek, i) => {
                const isHome = boek.title === "HOME";
                const isAbout = boek.title === "ABOUT ME";
                const isProject = boek.title.startsWith("PROJECT");
                const isSelected = activeBookTitle === boek.title;
                
                let widthClasses = "w-12 md:w-16 lg:w-20 xl:w-24"; 
                if (isHome) widthClasses = "w-24 md:w-32 lg:w-40 xl:w-56"; 

                let hoverWidthClasses = isHome 
                  ? "group-hover:w-16 md:group-hover:w-24 lg:group-hover:w-[300px] xl:group-hover:w-[380px]"
                  : "group-hover:w-16 md:group-hover:w-24 lg:group-hover:w-[350px] xl:group-hover:w-[500px]";
                
                if (isSelected) hoverWidthClasses += " w-16";

                return (
                  <div key={i} 
                       onMouseEnter={() => handleBookHover(boek)} 
                       onMouseLeave={handleBookLeave}
                       onClick={() => handleBookClick(boek)}
                       className={`relative group origin-bottom transition-all duration-500 shrink-0 snap-center hover:z-[70] ${isAbout ? 'rotate-[2deg] md:hover:rotate-0' : 'z-10'}`}>
                    
                    <div className={`relative flex flex-col justify-between py-6 md:py-8 px-3 shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden 
                      ${widthClasses}
                      ${hoverWidthClasses}
                      ${isHome ? 'h-[220px] md:h-[40vh] lg:h-[50vh]' : isAbout ? 'h-[300px] md:h-[65vh] lg:h-[80vh]' : `${i % 2 === 0 ? 'h-[280px] md:h-[60vh] lg:h-[75vh]' : 'h-[250px] md:h-[55vh] lg:h-[70vh]'}`} 
                      `} 
                      style={{ 
                        backgroundColor: isSelected ? boek.bgColor : '#000000', 
                        color: isSelected ? boek.textColor : '#FFFFFF', 
                        '--hover-bg': boek.bgColor,
                        '--hover-text': boek.textColor 
                      } as any}>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
                           style={{ backgroundColor: 'var(--hover-bg)' }} />

                      <div className={`absolute inset-0 p-6 lg:p-10 hidden lg:flex flex-col justify-between transition-opacity duration-300 min-w-[200px] z-10 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                           style={{ color: 'var(--hover-text)' }}>
                        <div className="flex justify-between items-start border-b border-current pb-3 lg:pb-4">
                          <span className="font-serif italic font-bold" 
                                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', lineHeight: '1.2' }}>
                            {isProject ? boek.title : boek.system}
                          </span>
                        </div>
                        <div className="flex flex-col py-2">
                          <h3 className={`font-black leading-[0.8] tracking-tighter ${isHome ? 'text-3xl lg:text-5xl xl:text-6xl' : 'text-3xl lg:text-5xl xl:text-7xl'}`}>
                            {isProject ? boek.system : boek.title}
                          </h3>
                        </div>
                        {/* De onderste balk is nu leeg, zonder Esc/Close tekst */}
                        <div className="flex justify-between items-end border-t border-current pt-3 opacity-0">
                          <span className="text-[8px]">EMPTY</span>
                        </div>
                      </div>

                      {/* Verticale tekst weergave (standaard staat) */}
                      <div className={`h-full w-full flex flex-col justify-between items-center transition-opacity duration-200 z-10 ${isSelected ? 'opacity-0 lg:hidden' : 'lg:group-hover:hidden'}`}>
                        <span className="text-[9px] md:text-[12px] lg:text-[14px] font-serif italic font-bold vertical-text opacity-80">{boek.system}</span>
                        <div className="flex flex-col items-center gap-3 lg:gap-4">
                          <span className={`${isHome ? 'text-[16px] md:text-2xl lg:text-3xl' : 'text-[14px] md:text-xl lg:text-2xl'} font-black rotate-90 whitespace-nowrap tracking-tighter`}>
                            {boek.title}
                          </span>
                        </div>
                        <span className="text-[9px] md:text-[12px] lg:text-[15px] font-serif italic font-bold">{i + 1}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vertical-text { writing-mode: vertical-rl; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .gd-label { bottom: 2.8em; }
        @media (min-width: 768px) { .gd-label { bottom: 2.2em; } }
      `}</style>
    </div>
  );
}