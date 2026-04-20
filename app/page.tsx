"use client"


import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Only use the 6 images with '5000' in the filename
const imageList = [
  'IMG_5001.PNG',
  'IMG_5003.PNG',
  'IMG_5004.PNG',
  'IMG_5005.PNG',
  'IMG_5006.PNG',
];

// Layout for 6 images, visually balanced and overlapping
// All y-coordinates shifted up by another 40px
// All x-coordinates shifted right by 50px
const collageLayout = [
  { x: -70, y: -220, angle: -15, w: 340 * 1.2, h: 220 * 1.2 }, // 0
  { x: 150, y: -200, angle: 13, w: 320 * 1.2, h: 210 * 1.2 }, // 1
  { x: -30, y: -80, angle: 8, w: 350 * 1.2, h: 250 * 1.2 }, // 2
  { x: 110, y: -60, angle: -7, w: 400 * 1.2, h: 270 * 1.2 }, // 3
  { x: -50, y: 20, angle: 18, w: 260 * 1.2, h: 180 * 1.2 }, // 4
  { x: 170, y: 20, angle: -12, w: 320 * 1.2, h: 200 * 1.2 }, // 5
];

export default function HomePage() {
  const [hovered, setHovered] = useState<number|null>(null);
  const heroTitle = 'Welcome to my portfolio.';
  const [typedTitle, setTypedTitle] = useState('');
  const [isMounted, setIsMounted] = useState(false);



  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedTitle(heroTitle.slice(0, index));
      if (index >= heroTitle.length) {
        window.clearInterval(timer);
      }
    }, 85);

    return () => window.clearInterval(timer);
  }, [heroTitle]);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  // Spiral hero: animated rings
  const rings = 16;
  const lettersPerRing = 46;
  const spiralText = Array.from({length: rings}, (_, ringIdx) =>
    Array.from({length: lettersPerRing}, (_, i) => {
      const word = 'PORTFOLIO';
      return word[(i + ringIdx * 2) % word.length];
    })
  );

  // Animation state for each ring
  const [angles, setAngles] = useState(() => Array(rings).fill(0));
  const requestRef = useRef<number | null>(null);

  // Animate spiral rings and spiral container drift
  const [drift, setDrift] = useState({x: 0, y: 0});
  useEffect(() => {
    let last = performance.now();
    function animate(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      setAngles(prev => prev.map((a, idx) => {
        // Alternate direction every 2 rings voor meer organisch effect
        const dir = Math.floor(idx / 2) % 2 === 0 ? 1 : -1;
        // Maak de rotatie veel sneller voor zichtbare animatie
        return a + dir * dt * 2.5;
      }));
      // Animate the spiral container in an even slower circular drift
      setDrift({
        x: Math.cos(now / 32000) * 18,
        y: Math.sin(now / 40000) * 14
      });
      // Debug: log om te zien of animatie loopt
      if (Math.random() < 0.01) console.log('Spiral animatie loopt', now);
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Spiral Text Hero Section */}
      <section className="w-full flex items-center justify-center pt-20 pb-10">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 'min(98vw, 820px)',
            height: 'min(98vw, 820px)',
            transform: `translate(${drift.x}px, ${drift.y}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          <div className="absolute inset-0" style={{pointerEvents: 'none'}}>
            {isMounted &&
              spiralText.map((ring, ringIdx) => {
                const baseRadius = 44 + 110 * Math.sin((ringIdx / (rings-1)) * Math.PI);
                // Raise all rings by reducing the vertical spread
                const baseY = 8 + (ringIdx / (rings-1)) * 220;
                const angleOffset = angles[ringIdx] || 0;
                return ring.map((letter, i) => {
                  const theta = (i / ring.length) * Math.PI * 2 + angleOffset * Math.PI / 180;
                  const cx = 82 + baseRadius * Math.cos(theta) / 100 * 100 / 2;
                  const cy = baseY + (baseRadius * Math.sin(theta) / 100 * 100 / 2) * 0.7;
                  const rotate = theta * 57.2958 + 90;
                  return (
                    <span
                      key={ringIdx + '-' + i}
                      style={{
                        position: 'absolute',
                        left: `${cx}%`,
                        top: `${cy}%`,
                        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                        fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                        fontWeight: 300,
                        fontSize: 'clamp(0.7rem, 1.1vw, 1.05rem)',
                        color: '#222',
                        letterSpacing: '0.12em',
                        whiteSpace: 'nowrap',
                        opacity: 0.82,
                        userSelect: 'none',
                      }}
                    >
                      {letter}
                    </span>
                  );
                });
              })}
          </div>
        </div>
      </section>
      {/* Left-aligned text block */}
      <div className="absolute top-12 left-12 z-10 text-left" style={{maxWidth: 240}}>
        <div className="text-[1.6rem] leading-snug font-light text-black" style={{fontFamily:'Georgia, Times, serif', letterSpacing:0, fontWeight: 300, lineHeight: 1.35}}>
          <span style={{fontSize: '1.55em', fontWeight: 300}}>
            {typedTitle}
            {typedTitle.length < heroTitle.length && (
              <span className="typing-cursor" aria-hidden="true">|</span>
            )}
          </span><br />
          <span style={{display:'block', marginTop: '1.7em', fontWeight: 300, fontSize: '1.35rem', color: 'inherit', fontFamily: 'inherit'}}>Van Avermaet Lisa Marie</span>
          <span style={{
            display:'block',
            fontWeight: 400,
            fontSize: '1rem',
            color: '#444',
            marginTop: '0.2em',
            letterSpacing: '0.01em',
            lineHeight: 1.5
          }}>Visual Design Student</span>
        </div>
        <div className="mt-14 text-[1rem] text-black/80 font-light" style={{fontFamily:'Georgia, Times, serif', fontWeight: 400}}>
          <div className="mb-1 tracking-wide" style={{letterSpacing: '0.01em'}}>Ontdek</div>
          <div>
            <a href="/project" className="underline cursor-pointer" style={{textDecorationThickness: '1.5px'}}>Mijn Projecten</a>
          </div>
        </div>
      </div>

      {/* Collage of images, center of page */}
      <div className="absolute inset-0 flex items-center justify-center select-none">
        <div className="relative w-[900px] h-[800px] max-w-full max-h-[90vh]">
          {imageList.map((img, i) => {
            const layout = collageLayout[i] || {x:0,y:0,angle:0,w:320,h:220};
            return (
              <div
                key={img}
                className="absolute transition-all duration-500 ease-[cubic-bezier(.4,1.6,.4,1)] shadow-xl"
                style={{
                  left: `calc(50% + ${layout.x}px - ${layout.w/2}px)`,
                  top: `calc(50% + ${layout.y}px - ${layout.h/2}px)`,
                  width: hovered === i ? layout.w * 1.13 : layout.w,
                  height: hovered === i ? layout.h * 1.13 : layout.h,
                  zIndex: hovered === i ? 40 : 10 + i,
                  transform: `rotate(${hovered === i ? 0 : layout.angle}deg) scale(${hovered === i ? 1.13 : 1})`,
                  boxShadow: hovered === i
                    ? '0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)'
                    : '0 2px 12px 0 rgba(0,0,0,0.10)',
                  transitionProperty: 'transform, box-shadow, z-index, width, height',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image
                  src={`/${img}`}
                  alt="Artwork"
                  fill
                  style={{objectFit:'cover', borderRadius: 0, border: '1.5px solid #eee', opacity: 1}} 
                  sizes="(max-width: 900px) 90vw, 400px"
                  priority={i<3}
                />
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        main {
          font-family: 'Georgia', 'Times New Roman', Times, serif;
        }
        .underline { text-decoration: underline; }
        .typing-cursor {
          display: inline-block;
          margin-left: 0.08em;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </main>
  );
}
