"use client"

import React from 'react';

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
    rel="stylesheet"
  />
);

export default function AboutPage() {
  const pureWhite = '#FFFFFF';
  const accentColor = "#FDC5C6";

  return (
    <>
      <FontLink />
      <div 
        /* Mobiel: px-2 | Desktop: md:p-12 */
        className="min-h-screen w-full font-sans uppercase select-none px-2 py-6 md:p-12 overflow-x-hidden"
        style={{ backgroundColor: pureWhite, color: '#000000' }}
      >
        {/* Header Sectie */}
        <header className="flex flex-col md:flex-row justify-between items-start border-b border-black pb-6 md:pb-8 mb-8 md:mb-12">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] md:leading-[0.85]">
              ABOUT<br />ME
            </h1>
            <span 
              className="absolute bottom-[-2px] right-0 md:-bottom-2 md:right-[-40px] text-3xl sm:text-5xl md:text-7xl italic normal-case z-10 whitespace-nowrap"
              style={{ 
                fontFamily: '"Pinyon Script", cursive', 
                color: accentColor,
              }}
            >
              Lisa Marie
            </span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Linker Kolom: Bio */}
          <div className="md:col-span-7 space-y-6 md:space-y-8">
            <h2 className="text-lg md:text-2xl font-black border-b border-black inline-block pb-1">Manifesto</h2>
            
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.1] tracking-tight">
                Ik ben een gemotiveerde en leergierige persoon met een <span style={{ color: accentColor }}>passie</span> voor wat ik doe. In mijn werk streef ik altijd naar kwaliteit, creativiteit en groei.
              </p>
              
              <div className="normal-case text-black text-sm md:text-base leading-relaxed max-w-xl space-y-4">
                <p>
                  Ik hou ervan om nieuwe uitdagingen aan te gaan en mezelf continu te verbeteren, zowel op professioneel als persoonlijk vlak. Met een oog voor detail en een sterk verantwoordelijkheidsgevoel werk ik doelgericht aan projecten en opdrachten.
                </p>
                <p>
                  Ik functioneer goed zowel zelfstandig als in teamverband en ben altijd bereid om nieuwe vaardigheden te ontwikkelen. Mijn portfolio weerspiegelt mijn inzet, mijn ontwikkeling en mijn ambitie om verder te groeien binnen mijn vakgebied.
                </p>
              </div>
            </div>
          </div>

          {/* Rechter Kolom: Accent blok */}
          <div 
            className="md:col-span-5 space-y-8 md:space-y-12 p-5 sm:p-8 md:p-10 shadow-xl md:shadow-2xl transition-all"
            style={{ backgroundColor: accentColor, color: '#000000' }}
          >
            <section>
              <h3 className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] opacity-60 mb-4 md:mb-6 uppercase">Expertise Systems</h3>
              <ul className="space-y-3 md:space-y-4 font-black text-sm sm:text-base md:text-xl tracking-tighter">
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>Color Theory</span>
                  <span className="italic">●</span>
                </li>
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>UI/UX Design</span>
                  <span className="italic">●</span>
                </li>
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>Concept Development</span>
                  <span className="italic">●</span>
                </li>
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>Interactive Spatial Surfaces</span>
                  <span className="italic">●</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 pt-6 md:pt-8 border-t border-black flex flex-row justify-between items-end">
          {/* Minimalistische lijn als afsluiting */}
        </footer>
      </div>
    </>
  );
}