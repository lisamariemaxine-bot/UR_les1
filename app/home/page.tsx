"use client"

import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function HomePage() {
  const images = [
    'IMG_5001.PNG',
    'IMG_5002.PNG',
    'IMG_5003.PNG',
    'IMG_5004.PNG',
    'IMG_5005.PNG',
    'IMG_5006.PNG',
    'IMG_5007.PNG',
    'IMG_5008.PNG',
    'IMG_5009.PNG',
    'IMG_5019.PNG'
  ]

  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredBall, setHoveredBall] = useState(-1)
  const [hoveredOrbForOpacity, setHoveredOrbForOpacity] = useState(-1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const projectsRef = useRef<HTMLElement | null>(null)
  const flipOrderRef = useRef<number[]>([])
  const orb0Ref = useRef<HTMLAnchorElement>(null)
  const orb1Ref = useRef<HTMLAnchorElement>(null)
  const orb2Ref = useRef<HTMLAnchorElement>(null)

  const stars = useMemo(() => {
    const starCount = 140
    return Array.from({ length: starCount }, (_, index) => {
      const size = 0.6 + Math.random() * 1.8
      return {
        id: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size,
        opacity: 0.25 + Math.random() * 0.7,
        duration: 3 + Math.random() * 6,
        delay: Math.random() * 6
      }
    })
  }, [])

  const starRain = useMemo(() => {
    const dropCount = 40
    return Array.from({ length: dropCount }, (_, index) => {
      return {
        id: index,
        left: Math.random() * 100,
        size: 0.6 + Math.random() * 1.2,
        opacity: 0.2 + Math.random() * 0.6,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 10,
        startY: -20 - Math.random() * 20
      }
    })
  }, [])

  const bigStarRain = useMemo(() => {
    const dropCount = 1
    return Array.from({ length: dropCount }, (_, index) => {
      return {
        id: index,
        left: Math.random() * 100,
        size: 3.5 + Math.random() * 2.5,
        opacity: 0.45 + Math.random() * 0.35,
        duration: 10 + Math.random() * 6,
        delay: 6 + Math.random() * 8,
        startY: -30 - Math.random() * 30
      }
    })
  }, [])

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])

  useEffect(() => {
    // Kies 3 willekeurige foto's om al geflipped te zijn
    const randomIndexes = new Set<number>()
    while (randomIndexes.size < 3) {
      randomIndexes.add(Math.floor(Math.random() * images.length))
    }
    setFlippedCards(randomIndexes)

    // Random volgorde voor scroll-flip
    const order = images.map((_, i) => i)
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = order[i]
      order[i] = order[j]
      order[j] = temp
    }
    flipOrderRef.current = order
  }, [])

  useEffect(() => {
    if (scrollProgress > 0.05) {
      return
    }

    const interval = setInterval(() => {
      setFlippedCards(prev => {
        const newSet = new Set(prev)
        if (newSet.size >= 4) {
          const flippedArray = Array.from(newSet)
          const toUnflip = flippedArray[Math.floor(Math.random() * flippedArray.length)]
          newSet.delete(toUnflip)
        } else {
          const unflipped = images.map((_, i) => i).filter(i => !newSet.has(i))
          if (unflipped.length > 0) {
            const toFlip = unflipped[Math.floor(Math.random() * unflipped.length)]
            newSet.add(toFlip)
          }
        }
        return newSet
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [images.length, scrollProgress])

  useEffect(() => {
    let rafId = 0

    const onScroll = () => {
      if (!projectsRef.current) return
      if (rafId) cancelAnimationFrame(rafId)

      const currentRef = projectsRef.current
      rafId = requestAnimationFrame(() => {
        const triggerPoint = currentRef.offsetTop - window.innerHeight * 0.8
        const progress = Math.min(Math.max(window.scrollY / Math.max(triggerPoint - window.innerHeight, 1), 0), 1)
        setScrollProgress(progress)

        const order = flipOrderRef.current
        const targetCount = Math.floor(progress * order.length)
        setFlippedCards(new Set(order.slice(0, targetCount)))
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleStarHover = (hovering: boolean) => {
    setIsHovering(hovering)
    if (hovering) {
      const interval = setInterval(() => {
        setGlowIntensity(prev => Math.min(prev + 1, 100))
      }, 100)
      
      // Store interval ID on the button element
      const button = document.getElementById('star-button')
      if (button) {
        (button as any).glowInterval = interval
      }
    } else {
      const button = document.getElementById('star-button')
      if (button && (button as any).glowInterval) {
        clearInterval((button as any).glowInterval)
      }
      setGlowIntensity(0)
    }
  }

  const glowStyle = {
    filter: `${isHovering ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.1))' : ''}
             drop-shadow(0 0 ${glowIntensity * 5}px rgba(255,255,255,${Math.min(glowIntensity / 50, 1)})) 
             drop-shadow(0 0 ${glowIntensity * 15}px rgba(255,255,255,${Math.min(glowIntensity / 80, 1)})) 
             drop-shadow(0 0 ${glowIntensity * 30}px rgba(255,255,255,${Math.min(glowIntensity / 100, 1)}))
             drop-shadow(0 0 ${glowIntensity * 50}px rgba(255,255,255,${Math.min(glowIntensity / 120, 1)}))`,
    transform: `scale(${1 + glowIntensity / 500})`
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-0 bg-white">
      {/* White glow overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at calc(100% - 21rem) 25rem, 
            rgba(255, 250, 220, ${Math.min(glowIntensity / 100, 0.9)}) 0%, 
            rgba(255, 245, 200, ${Math.min(glowIntensity / 150, 0.7)}) ${glowIntensity * 3}px,
            rgba(255, 240, 180, ${Math.min(glowIntensity / 200, 0.5)}) ${glowIntensity * 6}px,
            rgba(255, 235, 160, ${Math.min(glowIntensity / 300, 0.3)}) ${glowIntensity * 10}px,
            transparent ${glowIntensity * 15}px)`
        }}
      />
      
      {/* Get Started button rechtsbovenaan */}
      <div className="absolute top-8 right-[5.75rem] z-30">
        <button 
          id="star-button"
          onMouseEnter={() => handleStarHover(true)}
          onMouseLeave={() => handleStarHover(false)}
          className="relative w-40 h-40 bg-transparent text-black font-bold transition-all duration-300 flex items-center justify-center"
        >
          <svg 
            width="280" 
            height="160" 
            viewBox="0 0 128 128" 
            fill="white" 
            className="absolute transition-all duration-300" 
            style={glowStyle}
            preserveAspectRatio="none"
          >
            <path d="M64 8 L70 44 L100 30 L82 60 L114 64 L82 68 L100 98 L70 84 L64 120 L58 84 L28 98 L46 68 L14 64 L46 60 L28 30 L58 44 Z" />
          </svg>
          <span className="relative z-10 text-sm uppercase">BUTTON</span>
        </button>
      </div>
      
      {/* 3x3 Grid linksonder */}
      {isMounted && createPortal(
        <div 
          className="fixed left-40 bottom-36 z-40 transition-opacity duration-300"
          style={{
            opacity: 1 - scrollProgress,
            pointerEvents: scrollProgress >= 1 ? 'none' : 'auto'
          }}
        >
          <div className="grid grid-cols-4 gap-2">
            {/* Eerste vakje leeg */}
            <div className="w-20 h-20"></div>
            
            {/* 10 foto's */}
            {images.map((img, i) => (
              <div 
                key={i} 
                className="w-20 h-20 cursor-pointer" 
                style={{ perspective: '1000px' }}
                onMouseEnter={() => handleFlip(i)}
                onClick={() => setSelectedImage(img)}
              >
                <div 
                  className="w-full h-full relative transition-transform duration-700" 
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: flippedCards.has(i) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Voorkant - foto */}
                  <div className="absolute inset-0 bg-black overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <Image
                      src={`/${img}`}
                      alt={`Image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Achterkant - zwart */}
                  <div className="absolute inset-0 bg-black" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Laatste vakje rechtsonder leeg */}
            <div className="w-20 h-20"></div>
          </div>
        </div>,
        document.body
      )}
      <div className="relative z-10 w-full mx-auto px-4 space-y-4 flex flex-col items-center mt-2">
        <h1 className="text-9xl font-bold uppercase leading-tight w-full max-w-7xl glow-hover transition-all duration-500 mt-0">
          <div className="text-left">
            <span className="decorative-w">W</span>e<span className="flicker-1">l</span>co<span className="flicker-2">m</span>e
          </div>
          <div className="text-right">
            <span className="inline-block text-left">
              <div>to <span className="flicker-3">m</span>y</div>
              <div>p<span className="flicker-1">o</span>rtf<span className="flicker-2">o</span>lio</div>
            </span>
          </div>
        </h1>
        <p className="text-lg text-white mt-2">
          Lisa Marie Van Avermaet
        </p>
      </div>

      <section 
        ref={projectsRef} 
        className="relative z-10 w-full text-white mt-2 py-12 min-h-screen -mx-20 px-20 overflow-hidden"
        style={{
          background: '#222',
          transition: 'background 1s ease-out'
        }}
      >
        <div className="stars-layer" aria-hidden="true">
          {stars.map((star) => (
            <span
              key={`star-${star.id}`}
              className="star"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </div>
        <div className="stars-rain" aria-hidden="true">
          {starRain.map((drop) => (
            <span
              key={`drop-${drop.id}`}
              className="star-drop"
              style={{
                left: `${drop.left}%`,
                top: `${drop.startY}%`,
                width: `${drop.size}px`,
                height: `${drop.size}px`,
                opacity: drop.opacity,
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`
              }}
            />
          ))}
          {bigStarRain.map((drop) => (
            <span
              key={`big-drop-${drop.id}`}
              className="star-drop star-drop-large"
              style={{
                left: `${drop.left}%`,
                top: `${drop.startY}%`,
                width: `${drop.size}px`,
                height: `${drop.size}px`,
                opacity: drop.opacity,
                animationDuration: `${drop.duration}s`,
                animationDelay: `${drop.delay}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold uppercase text-center mb-8"><span className="decorative-w">P</span>rojects</h2>
          <div className="grid grid-cols-3 gap-12">
            {/* Project 1 - Visual Design orb links to /project */}
            <a
              href="/project"
              ref={orb0Ref}
              className="relative inline-flex items-center justify-center cursor-pointer float-animation transition-all duration-300 ease-out"
              onMouseEnter={() => { setHoveredBall(0); setHoveredOrbForOpacity(0); }}
              onMouseLeave={() => { setHoveredOrbForOpacity(-1); setHoveredBall(-1); }}
              style={{ animationDelay: '0s', opacity: hoveredOrbForOpacity !== -1 && hoveredOrbForOpacity !== 0 ? 0.5 : 1, transform: hoveredOrbForOpacity === 0 ? 'scale(1.2)' : 'scale(1)' }}
            >
              <div className="rounded-full w-64 h-64" style={{
                background: 'radial-gradient(circle, rgba(255,165,0,0.85) 0%, rgba(255,140,0,0.6) 30%, rgba(255,120,0,0.35) 55%, rgba(255,140,0,0.2) 72%, rgba(255,140,0,0.1) 85%, transparent 100%)',
                boxShadow: hoveredOrbForOpacity === 0 && hoveredBall === 0
                  ? '0 0 90px rgba(255,140,0,0.7), 0 0 140px rgba(255,100,0,0.6), inset 0 0 30px rgba(255,140,0,0.25), inset 0 0 60px rgba(255,100,0,0.15)'
                  : '0 0 60px rgba(255,140,0,0.4), 0 0 100px rgba(255,100,0,0.3), inset 0 0 25px rgba(255,140,0,0.18), inset 0 0 50px rgba(255,100,0,0.12)',
                filter: hoveredOrbForOpacity === 0 && hoveredBall === 0 ? 'brightness(1.2) saturate(1.25)' : 'brightness(1) saturate(1)'
              }}></div>
              <p className="absolute text-2xl font-bold text-orange-200 text-center max-w-48 opacity-90 text-glow-orange">LEPORELLO</p>
            </a>
            
            {/* Project 2 */}
            <a
              href="/project2"
              ref={orb1Ref}
              className="relative inline-flex items-center justify-center cursor-pointer float-animation transition-all duration-300 ease-out"
              onMouseEnter={() => { setHoveredBall(1); setHoveredOrbForOpacity(1); }}
              onMouseLeave={() => { setHoveredOrbForOpacity(-1); setHoveredBall(-1); }}
              style={{ animationDelay: '0.6s', opacity: hoveredOrbForOpacity !== -1 && hoveredOrbForOpacity !== 1 ? 0.5 : 1, transform: hoveredOrbForOpacity === 1 ? 'scale(1.2)' : 'scale(1)' }}
            >
              <div className="rounded-full w-64 h-64" style={{
                background: 'radial-gradient(circle, rgba(0,200,200,0.85) 0%, rgba(0,185,190,0.6) 30%, rgba(0,175,175,0.35) 55%, rgba(0,180,150,0.2) 72%, rgba(0,180,150,0.1) 85%, transparent 100%)',
                boxShadow: hoveredOrbForOpacity === 1 && hoveredBall === 1
                  ? '0 0 90px rgba(0,200,200,0.7), 0 0 140px rgba(0,170,188,0.6), inset 0 0 30px rgba(0,200,200,0.25), inset 0 0 60px rgba(0,170,188,0.15)'
                  : '0 0 60px rgba(0,200,200,0.4), 0 0 100px rgba(0,170,188,0.3), inset 0 0 25px rgba(0,200,200,0.18), inset 0 0 50px rgba(0,170,188,0.12)',
                filter: hoveredOrbForOpacity === 1 && hoveredBall === 1 ? 'brightness(1.2) saturate(1.25)' : 'brightness(1) saturate(1)'
              }}></div>
              <p className="absolute text-2xl font-bold text-cyan-200 text-center max-w-48 opacity-90 text-glow-cyan">FIBONACCI</p>
            </a>
          </div>
        </div>
      </section>
      
      {/* Modal voor grote foto weergave */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={`/${selectedImage}`}
              alt="Selected image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Press+Start+2P&display=swap');
        
        .decorative-w {
          font-family: 'Great Vibes', cursive;
          font-size: 1.5em;
          font-weight: normal;
        }
        
        .fun-font {
          font-family: 'Press Start 2P', cursive;
          font-size: 0.75em;
          letter-spacing: 0.05em;
        }

        .text-glow-orange {
          text-shadow: 0 0 8px rgba(255, 140, 0, 0.45), 0 0 16px rgba(255, 120, 0, 0.35);
        }

        .text-glow-cyan {
          text-shadow: 0 0 8px rgba(0, 200, 200, 0.45), 0 0 16px rgba(0, 170, 188, 0.35);
        }

        .text-glow-pink {
          text-shadow: 0 0 8px rgba(200, 90, 150, 0.45), 0 0 16px rgba(205, 95, 160, 0.35);
        }

        .stars-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          opacity: 0.85;
        }

        .stars-rain {
          position: absolute;
          inset: 0;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .star {
          position: absolute;
          border-radius: 999px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          animation: starTwinkle linear infinite;
        }

        .star-drop {
          position: absolute;
          border-radius: 999px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 14px rgba(255, 255, 255, 0.8);
          animation: starDrop linear infinite;
        }

        .star-drop-large {
          border-radius: 999px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 22px rgba(255, 255, 255, 0.95), 0 0 44px rgba(255, 255, 255, 0.7);
          filter: drop-shadow(0 0 26px rgba(255, 255, 255, 0.75));
        }

        @keyframes starRain {
          0% { transform: translateY(0); }
          100% { transform: translateY(50%); }
        }

        @keyframes starTwinkle {
          0% { opacity: 0.6; transform: scale(0.9); }
          40% { opacity: 1; transform: scale(1.25); }
          100% { opacity: 0.7; transform: scale(1); }
        }

        @keyframes starDrop {
          0% { transform: translateY(0); }
          100% { transform: translateY(140vh); }
        }
        
        .glow-hover:hover {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
                       0 0 30px rgba(255, 255, 255, 0.2),
                       0 0 40px rgba(255, 255, 255, 0.1);
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .flicker-1 {
          animation: flicker 5s infinite;
        }
        
        .flicker-2 {
          animation: flicker 6s infinite;
          animation-delay: 1s;
        }
        
        .flicker-3 {
          animation: flicker 7s infinite;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 60px rgba(255,140,0,0.4)) drop-shadow(0 0 100px rgba(255,100,0,0.3));
          }
          50% {
            transform: translateY(-40px) scale(1.15);
            filter: drop-shadow(0 0 100px rgba(255,140,0,0.8)) drop-shadow(0 0 160px rgba(255,100,0,0.7));
          }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% {
            background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #ffffff 50%, #f5f5f5 75%, #ffffff 100%);
            background-size: 400% 400%;
            background-position: 0% 50%;
          }
          50% {
            background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 25%, #f5f5f5 50%, #ffffff 75%, #f5f5f5 100%);
            background-size: 400% 400%;
            background-position: 100% 50%;
          }
          100% {
            background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #ffffff 50%, #f5f5f5 75%, #ffffff 100%);
            background-size: 400% 400%;
            background-position: 0% 50%;
          }
        }

        .gradient-animation {
          animation: gradientShift 6s ease infinite;
          background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #ffffff 50%, #f5f5f5 75%, #ffffff 100%);
          background-size: 400% 400%;
        }

      `}</style>
    </div>
  )
}
