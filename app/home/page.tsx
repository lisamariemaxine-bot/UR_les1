"use client"

import React, { useState, useEffect, useRef } from 'react';
import HeroPhoto from '@/components/HeroPhoto';
import studyStyles from './study.module.css';
import paperOverlay from './paper-overlay.module.css';
import FibonacciSection from '@/components/FibonacciSection';
import AcousticLaptopSection from '@/components/AcousticLaptopSection';
import PhotoStudyGallery from '@/components/PhotoStudyGallery';
import RepellingText from '@/components/RepellingText';
import ScrollHint from '@/components/ScrollHint';
import ScrollWave from '@/components/ScrollWave';
import { motion, useMotionValue, useScroll, useTransform, useSpring, useReducedMotion, type MotionValue } from 'framer-motion';

const words = ["PORTFOLIO", "GRAPHIC", "DESIGN", "VAN", "AVERMAET", "LISA", "MARIE"];
const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789#%&*";
// Keep the initial server and browser render identical, with scrambled letters.
const initialWords = words.map((word, wordIndex) =>
  word.split("").map((_, letterIndex) => chars[(wordIndex * 13 + letterIndex * 7 + 5) % 24]).join("")
);

function ScrollWord({ progress, fixedLeft = false, children, className = '', style }: {
  progress: MotionValue<number>;
  fixedLeft?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useMotionValue(0);
  const x = useTransform(() => fixedLeft ? 0 : -progress.get() * distance.get());

  useEffect(() => {
    const word = ref.current;
    const row = word?.closest<HTMLElement>('[data-word-container]');
    const panel = word?.closest<HTMLElement>('[data-text-panel]');
    if (!word || !row || !panel) return;
    const measure = () => distance.set(row.clientWidth - word.offsetWidth + parseFloat(getComputedStyle(panel).paddingLeft));
    const observer = new ResizeObserver(measure);
    observer.observe(word);
    observer.observe(row);
    observer.observe(panel);
    measure();
    return () => observer.disconnect();
  }, [distance]);

  return (
    <motion.span ref={ref} className={`${fixedLeft ? 'relative -left-3 md:-left-8 self-start text-left' : 'self-end'} block whitespace-nowrap ${className}`} style={{ ...style, x }}>
      {children}
    </motion.span>
  );
}

export default function HomePage() {

  const [displayedWords, setDisplayedWords] = useState(initialWords);
  const [studyActive, setStudyActive] = useState(false);
  const [lettersReady, setLettersReady] = useState(false);
  const activeTextColor = '#000000';
  const photoImpact = useMotionValue(0);
  const wavePosition = useMotionValue<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const studyRef = useRef<HTMLElement>(null);
  const photoRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({ container: containerRef, target: introRef, offset: ['start start', 'end start'] });
  const reducedMotion = useReducedMotion();
  const paperTargetY = useTransform(introProgress, [0, 1], [8, -16]);
  const paperY = useSpring(paperTargetY, { stiffness: 20, damping: 28 });
  const scrollYProgress = useTransform(introProgress, [0, 0.6], [0, 1]);
  const { scrollYProgress: studyProgress } = useScroll({ container: containerRef, target: studyRef, offset: ['start end', 'start 35%'] });
  const studyTitleX = useTransform(studyProgress, [0, 1], ['100vw', '0vw']);

  const introBackground = '#FFFFFF';

  useEffect(() => {
    const waitingWords = words.map(word =>
      word.split("").map(() => chars[Math.floor(Math.random() * 24)]).join("")
    );
    setDisplayedWords(waitingWords);
    const startedAt = performance.now();
    const letterDuration = 100;
    let nextStart = 0;
    const startTimes = words.map(word => {
      const start = nextStart;
      nextStart += word.length * letterDuration / 4;
      return start;
    });
    const totalDuration = Math.max(...words.map((word, index) => startTimes[index] + word.length * letterDuration));
    const interval = setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setDisplayedWords(words.map((word, index) => {
        const wordElapsed = elapsed - startTimes[index];
        if (wordElapsed < 0) return waitingWords[index];
        const revealedLetters = Math.floor(wordElapsed / letterDuration);
        return word.split("").map((letter, i) =>
          i < revealedLetters ? letter : chars[Math.floor(Math.random() * chars.length)]
        ).join("");
      }));
      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setLettersReady(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);


  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      aria-label="Portfolio — scroll om de tekst links uit te lijnen"
      className="fixed inset-x-0 bottom-0 top-16 z-[10001] w-full font-sans uppercase overflow-x-hidden overflow-y-auto overscroll-x-none overscroll-y-contain select-none md:cursor-auto" 
      style={{ backgroundColor: introBackground, color: activeTextColor }}
    >
      {/* Keep the intro visible while the dot moves to the middle. */}
      <div ref={introRef} className="relative min-h-[calc(200dvh-8rem)] bg-[#FFFFFF]">
      <div className="sticky top-0 min-h-[calc(100dvh-4rem)]">
      <div aria-hidden="true" className={paperOverlay.overlay}>
        <motion.div className={paperOverlay.texture} style={{ y: reducedMotion ? 0 : paperY }} />
      </div>
      <HeroPhoto />
      <div className="relative z-[60] flex min-h-[calc(100dvh-4rem)] w-full pointer-events-none">
        
        {/* Tekst uitsluitend in de rechterhelft van de pagina */}
        <div data-text-panel className="ml-auto w-1/2 min-w-0 shrink-0 px-3 py-6 md:px-8 md:py-10 flex flex-col justify-center relative z-[60]">
          <div data-word-container className="leading-none w-full flex flex-col items-end gap-y-5 md:gap-y-8">
            <div data-word-container className="relative w-full flex flex-col items-end gap-y-5 md:gap-y-8">
              {words.slice(1, 3).map((word, wordIdx) => (
                <ScrollWord
                  progress={scrollYProgress}
                  key={word}
                  className="font-sans font-black tracking-tighter uppercase transition-colors duration-500"
                  style={{ fontSize: 'clamp(0.75rem, 5.8vw, 6.4rem)', color: activeTextColor, lineHeight: '0.85', textAlign: 'right' }}
                >
                  <RepellingText wavePosition={wavePosition} text={displayedWords[wordIdx + 1]} />
                </ScrollWord>
              ))}
            </div>
            <h2
              className="relative -left-3 md:-left-8 w-full text-left tracking-tighter font-black transition-colors duration-500"
              style={{ color: activeTextColor, fontSize: 'clamp(0.75rem, 5.8vw, 6.4rem)', lineHeight: '0.85' }}
            >
              <RepellingText wavePosition={wavePosition} text={displayedWords[0]} />
            </h2>

            <h1 className="contents font-sans font-black tracking-tighter leading-[0.85] text-right" 
                style={{ fontSize: 'clamp(0.75rem, 5.8vw, 6.4rem)' }}>
              {displayedWords.slice(3).map((part, partIdx) => (
                <ScrollWord progress={scrollYProgress} fixedLeft={partIdx === 0} key={partIdx}>
                  <RepellingText wavePosition={wavePosition} text={part} />
                </ScrollWord>
              ))}
            </h1>
          </div>
        </div>

      </div>
      </div>
      </div>
      <section ref={studyRef} data-active={studyActive} aria-labelledby="leporello-title" className={`${studyStyles.section} relative min-h-[100dvh] w-full px-[4vw] py-16 md:py-24`}>
        <div className="relative z-10 overflow-hidden">
          <motion.h2 id="leporello-title" style={{ x: studyTitleX }} className={`${studyStyles.title} text-[clamp(2.5rem,8vw,6rem)] font-black leading-none tracking-tighter`}>Fotostudie <span className="text-[0.5em] font-medium">Cartier-Bresson</span></motion.h2>
        </div>
        <p className="relative z-10 mt-8 max-w-2xl text-sm md:text-base font-medium leading-relaxed normal-case">
          Voor deze fotoreeks liet ik me inspireren door de straatfotografie van Henri Cartier-Bresson en zijn aandacht voor het ‘beslissende moment’. Tijdens mijn verblijf in Italië fotografeerde ik spontane momenten uit het dagelijkse leven. Ik lette op compositie, licht en timing om gewone situaties op een interessante manier vast te leggen. De beelden zijn niet geposeerd, maar tonen wat ik onderweg tegenkwam.
        </p>
        <div ref={photoRowRef} aria-label="Zes foto's uit de fotoreeks Cartier-Bresson" className="mt-[4vw] w-full">
          <PhotoStudyGallery container={containerRef} impact={photoImpact} />
        </div>
      </section>
      <FibonacciSection container={containerRef} previousGallery={photoRowRef} />
      <AcousticLaptopSection container={containerRef} />
      <ScrollWave container={containerRef} position={wavePosition} impactSection={studyRef} impactTarget={photoRowRef} impact={photoImpact} onSectionContact={setStudyActive} sectionActive={studyActive} />
      <ScrollHint container={containerRef} ready={lettersReady} />

    </div>
  );
}
