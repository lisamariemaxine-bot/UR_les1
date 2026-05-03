"use client"

import React, { useState, useEffect, useRef } from 'react';

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
    rel="stylesheet"
  />
);

export default function HomePage() {
  const [activeTextColor, setActiveTextColor] = useState('#000000');
  const [displayedPortfolio, setDisplayedPortfolio] = useState('');
  const [hoveredLetters, setHoveredLetters] = useState<{ [key: number]: boolean }>({});
  const letterTimeouts = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const resetTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const offWhite = '#FAFAFA';
  const fullText = "PORTFOLIO";
  const nameParts = ["VAN", "AVERMAET", "LISA MARIE"];
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789#%&*";

  const letterColors = ["#FF97D0", "#125603", "#C3F380", "#D13F13", "#FDC5C6"];

  const boeken = [
    { title: "HOME", code: "H.00", system: "MAIN INTERFACE", edition: "VER. 1.0", bgColor: "#FF97D0", textColor: "#125603", description: "Pastel Magenta Landing" },
    { title: "PROJECT 1", code: "P.01", system: "YEAR DATABASE", edition: "ED. 01", bgColor: "#125603", textColor: "#C3F380", description: "Lincoln Green Identity" },
    { title: "PROJECT 2", code: "P.02", system: "M2-SYSTEMS™", edition: "ED. 02", bgColor: "#C3F380", textColor: "#7523B4", description: "Light Lime Systems" },
    { title: "PROJECT 3", code: "P.03", system: "ARCHIVE_LOG", edition: "ED. 01", bgColor: "#FAE170", textColor: "#D13F13", description: "Sinopia Editorial" },
    { title: "ABOUT ME", code: "AB.04", system: "BIO_DATA", edition: "INFO", bgColor: "#FDC5C6", textColor: "#D13F13", description: "Profile and Background" },
  ];

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedPortfolio(fullText.split("").map((l, i) => i < iteration ? fullText[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
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
    setActiveTextColor(boek.bgColor); 
  };

  const handleBookLeave = () => {
    resetTimeout.current = setTimeout(() => setActiveTextColor('#000000'), 150);
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
    <>
      <FontLink />
      <div 
        ref={containerRef}
        className="fixed inset-0 h-[100dvh] w-full font-sans uppercase overflow-hidden select-none md:cursor-none" 
        style={{ backgroundColor: offWhite, ['--m-x' as any]: '0px', ['--m-y' as any]: '0px' }}
      >
        <div className="flex flex-col md:flex-row h-full w-full relative">
          
          <div className="linkse-tekst w-full md:w-[40vw] lg:w-[45vw] h-full p-6 md:p-10 md:pb-20 flex flex-col justify-end relative z-[60] pointer-events-none">
            <div className="leading-none w-full pointer-events-auto flex flex-col items-start gap-1 max-w-full">
              <div className="flex flex-col items-start relative max-w-fit w-full">
                <div className="inline-flex flex-col relative w-full">
                  {/* De kleur van h2 wordt nu bepaald door activeTextColor */}
                  <h2 className="tracking-tighter flex items-end justify-start transition-colors duration-500" style={{ color: activeTextColor }}>
                    <span className="select-none inline-block leading-none" 
                          style={{ 
                            fontFamily: '"Pinyon Script", cursive',
                            fontSize: 'clamp(4rem, 12vw, 12rem)', 
                            marginRight: '-0.1em',
                            marginBottom: '0.05em',
                            transform: 'translateY(0.25em) rotate(-2deg)',
                            zIndex: 10,
                            fontWeight: 400
                          }}>
                      {displayedPortfolio.charAt(0)}
                    </span>
                    <span className="font-black leading-[0.85] relative z-20" 
                          style={{ fontSize: 'clamp(1.8rem, 7vw, 5.5rem)' }}>
                      {displayedPortfolio.slice(1)}
                    </span>
                  </h2>
                  <span className="font-serif italic font-light tracking-tight normal-case block z-30 absolute left-0 right-0 transition-colors duration-500" 
                        style={{ 
                          fontSize: 'clamp(0.9rem, 3vw, 2.8rem)',
                          color: activeTextColor,
                          bottom: '1.5em', 
                          textAlign: 'right'
                        }}>
                    graphic design
                  </span>
                </div>
              </div>

              <h1 className="font-black tracking-tighter leading-[0.9] text-left" 
                  style={{ fontSize: 'clamp(1.5rem, 5vw, 4.8rem)' }}>
                {nameParts.map((part, partIdx) => (
                  <span key={partIdx} className="inline-block whitespace-nowrap mr-[0.3em]">
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
                    {partIdx < nameParts.length - 1 && <br className="hidden md:block" />}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="w-full md:w-full h-full relative flex items-end md:items-center justify-start md:justify-end overflow-x-auto md:overflow-visible p-4 md:p-6 snap-x snap-mandatory no-scrollbar md:fixed md:top-0 md:right-0 z-10">
            <div className="relative flex items-end h-[60dvh] md:h-[85vh] lg:h-[90vh] min-w-max md:min-w-0 md:w-auto max-w-full justify-end pb-8 md:pb-0 md:pr-8">
              <div className="flex items-end gap-1.5 md:gap-2 px-6 md:px-0">
                {boeken.map((boek, i) => {
                  const isHome = boek.title === "HOME";
                  const isAbout = boek.title === "ABOUT ME";
                  
                  let widthClasses = "w-12 md:w-16 lg:w-20 xl:w-24"; 
                  if (isHome) widthClasses = "w-24 md:w-32 lg:w-40 xl:w-56"; 
                  if (isAbout) widthClasses = "w-14 md:w-20 lg:w-24 xl:w-32";

                  let hoverWidthClasses = "group-hover:w-16 md:group-hover:w-24 lg:group-hover:w-[350px] xl:group-hover:w-[500px]";
                  if (isHome) hoverWidthClasses = "group-hover:w-28 md:group-hover:w-36 lg:group-hover:w-[220px] xl:group-hover:w-[280px]";

                  return (
                    <div key={i} 
                         onMouseEnter={() => handleBookHover(boek)} 
                         onMouseLeave={handleBookLeave}
                         className={`relative group origin-bottom transition-all duration-500 shrink-0 snap-center hover:z-[70] ${isAbout ? 'rotate-[2deg] md:hover:rotate-0' : 'z-10'}`}>
                      
                      <div className={`relative flex flex-col justify-between py-6 md:py-8 px-3 shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden 
                        ${widthClasses}
                        ${hoverWidthClasses}
                        ${isHome ? 'h-[220px] md:h-[40vh] lg:h-[50vh]' : isAbout ? 'h-[300px] md:h-[65vh] lg:h-[80vh]' : `${i % 2 === 0 ? 'h-[280px] md:h-[60vh] lg:h-[75vh]' : 'h-[250px] md:h-[55vh] lg:h-[70vh]'}`} 
                        `} 
                        style={{ 
                          backgroundColor: '#000000', 
                          color: '#FFFFFF', 
                          '--hover-bg': boek.bgColor,
                          '--hover-text': boek.textColor 
                        } as any}>
                        
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" 
                             style={{ backgroundColor: 'var(--hover-bg)' }} />

                        <div className="absolute inset-0 p-6 lg:p-10 hidden lg:flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[200px] z-10"
                             style={{ color: 'var(--hover-text)' }}>
                          <div className="flex justify-between items-start border-b border-current pb-3 lg:pb-4">
                            <span className="font-mono text-[8px] lg:text-[10px] font-bold">{boek.system}</span>
                            <span className="font-mono text-[8px] lg:text-[10px]">{boek.code}</span>
                          </div>
                          <div className="flex flex-col py-2">
                            <h3 className={`font-black leading-[0.8] tracking-tighter mb-3 ${isHome ? 'text-3xl lg:text-5xl xl:text-6xl' : 'text-4xl lg:text-6xl xl:text-8xl'}`}>{boek.title}</h3>
                            <p className="text-[10px] lg:text-[13px] font-black tracking-widest opacity-90 leading-tight">{boek.description}</p>
                          </div>
                          <div className="flex justify-between items-end border-t border-current pt-3">
                            <span className="text-[8px] lg:text-[11px] font-bold font-mono">VER_2026</span>
                            <span className="text-xl lg:text-3xl xl:text-4xl font-black italic">{boek.edition}</span>
                          </div>
                        </div>

                        <div className="h-full w-full flex flex-col justify-between items-center lg:group-hover:opacity-0 transition-opacity duration-200 z-10">
                          <span className="text-[7px] md:text-[10px] font-bold vertical-text rotate-180 opacity-80">{boek.system}</span>
                          <div className="flex flex-col items-center gap-3 lg:gap-4">
                            <span className={`${isHome ? 'text-[12px] md:text-xl' : 'text-[10px] md:text-lg'} font-black rotate-90 whitespace-nowrap tracking-tighter`}>{boek.title}</span>
                            <span className="text-[6px] rotate-90 opacity-40 font-mono">{boek.edition}</span>
                          </div>
                          <span className="text-[7px] md:text-[11px] font-bold vertical-text rotate-180">{boek.code}</span>
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
        `}</style>
      </div>
    </>
  );
}