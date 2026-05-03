"use client"

import React from 'react';

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
    rel="stylesheet"
  />
);

export default function AboutPage() {
  const offWhite = '#FAFAFA';
  const accentColor = "#FDC5C6"; // De roze kleur uit je 'About Me' boek

  return (
    <>
      <FontLink />
      <div 
        className="min-h-screen w-full font-sans uppercase select-none p-6 md:p-12"
        style={{ backgroundColor: offWhite, color: '#000000' }}
      >
        {/* Header Sectie */}
        <header className="flex flex-col md:flex-row justify-between items-start border-b border-black pb-8 mb-12">
          <div className="relative">
            {/* De hoofdtekst */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
              ABOUT<br />ME
            </h1>
            {/* De overlappende tekst */}
            <span 
              className="absolute -bottom-2 right-[-20px] md:right-[-40px] text-5xl md:text-7xl italic normal-case z-10"
              style={{ 
                fontFamily: '"Pinyon Script", cursive', 
                color: accentColor,
                marginTop: '-20px' 
              }}
            >
              Lisa Marie
            </span>
          </div>
          
          <div className="mt-12 md:mt-0 text-right font-mono text-[10px] md:text-xs tracking-widest space-y-1">
            <p>FILE_TYPE: BIOGRAPHY_DATA</p>
            <p>LOCATION: ANTWERP_BE</p>
            <p>STATUS: CREATIVE_AVAILABLE</p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Linker Kolom: Bio */}
          <div className="md:col-span-7 space-y-8">
            <h2 className="text-2xl font-black border-b border-black inline-block pb-1">Manifesto</h2>
            <p className="text-xl md:text-3xl font-bold leading-[1.1] tracking-tight">
              Ik transformeer complexe systemen naar <span style={{ color: accentColor }}>visuele poëzie</span>. 
              Mijn werk balanceert op de dunne lijn tussen brute functionaliteit en esthetische overgave. 
              Geen ruis, alleen de essentie.
            </p>
            <p className="normal-case text-gray-700 leading-relaxed max-w-xl">
              Gevestigd in het hart van de designwereld, werk ik aan projecten die de status quo uitdagen. 
              Van digitale ecosystemen tot tastbare edities; elk grid is een kans om een verhaal te vertellen 
              dat verder gaat dan pixels.
            </p>
          </div>

          {/* Rechter Kolom: Nu met de roze achtergrond en zwarte tekst */}
          <div 
            className="md:col-span-5 space-y-12 p-8 md:p-10 shadow-2xl transition-all"
            style={{ backgroundColor: accentColor, color: '#000000' }}
          >
            <section>
              <h3 className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-6 uppercase">Expertise_Systems</h3>
              <ul className="space-y-4 font-black text-lg md:text-xl tracking-tighter">
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>01_Visual Identity</span>
                  <span className="italic">●</span>
                </li>
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>02_Editorial Design</span>
                  <span className="italic">●</span>
                </li>
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>03_Type Curation</span>
                  <span className="italic">●</span>
                </li>
                <li className="flex justify-between border-b border-black/20 pb-2">
                  <span>04_Digital Logic</span>
                  <span className="italic">●</span>
                </li>
              </ul>
            </section>

            <section className="pt-8">
              <h3 className="font-mono text-[10px] tracking-[0.3em] opacity-50 mb-4 uppercase">Contact_Interface</h3>
              <div className="space-y-2 font-bold break-all">
                <p className="hover:line-through cursor-pointer transition-all">LISA.MARIE@STUDIO-AVERMAET.COM</p>
                <p className="hover:line-through cursor-pointer transition-all">@VAN_AVERMAET_DESIGN</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-black flex justify-between items-end">
          <div className="font-black text-4xl opacity-10">©2026</div>
          <div 
            className="text-5xl md:text-7xl opacity-20 rotate-[-5deg] normal-case"
            style={{ fontFamily: '"Pinyon Script", cursive' }}
          >
            Lisa Marie
          </div>
        </footer>
      </div>
    </>
  );
}