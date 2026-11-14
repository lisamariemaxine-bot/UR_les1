"use client"

import { useEffect, useRef, useState, useId, type RefObject } from "react"
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, type MotionValue } from "framer-motion"

const starPoints = Array.from({ length: 24 }, (_, index) => {
  const angle = index * Math.PI / 12 - Math.PI / 2
  const radius = index % 2 === 0 ? 16 : 7
  // Normalize floating-point differences between server and browser engines for hydration.
  const x = Number((Math.cos(angle) * radius).toFixed(3))
  const y = Number((Math.sin(angle) * radius).toFixed(3))
  return `${x},${y}`
}).join(' ')

export default function ScrollWave({ container, position, impactSection, impactTarget, impact, onSectionContact, sectionActive = false }: {
  container: RefObject<HTMLDivElement | null>
  position?: MotionValue<{ x: number; y: number } | null>
  impactSection?: RefObject<HTMLElement | null>
  impactTarget?: RefObject<HTMLElement | null>
  impact?: MotionValue<number>
  onSectionContact?: (active: boolean) => void
  sectionActive?: boolean
}) {
  const ref = useRef<SVGSVGElement>(null)
  const lineMaskId = useId()
  const sectionClipId = useId()
  const atSection = useRef(false)
  const dotColor = useMotionValue("#000")
  const [sectionBand, setSectionBand] = useState({ top: 0, height: 0 })
  const [textBounds, setTextBounds] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [geometry, setGeometry] = useState({ width: 0, height: 0, path: '' })
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; explosion?: boolean }[]>([])
  const touchingSection = useRef(false)
  const burstId = useRef(0)
  const reducedMotion = useReducedMotion()
  const scaleTarget = useMotionValue(1)
  const scale = useSpring(scaleTarget, { stiffness: 260, damping: 20 })
  const buildup = useMotionValue(1)
  const dotScale = useTransform(() => scale.get() * buildup.get())
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const lineOffset = useMotionValue(0)
  const rotation = useTransform(dotY, value => value * 0.12)

  useEffect(() => {
    const viewport = container.current
    if (!viewport) return
    let width = 0
    let height = 0
    let sections = 1
    let frame = 0
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    let lastSpark = -Infinity
    const start = 0
    const endMargin = 24
    const xAt = (index: number) => width * (index === 0 ? 0.5 : index % 2 === 0 ? 0.08 : 0.92)

    const updateDot = () => {
      frame = 0
      if (!height) return
      // Cancel scrolling during the pinned intro so only the dot moves along the line.
      const pinnedOffset = Math.min(Math.max(0, viewport.scrollTop), viewport.clientHeight)
      lineOffset.set(pinnedOffset)
      // Reach the viewport midpoint during the intro's one-viewport sticky phase.
      const topOffset = 32
      const progress = Math.min(1, Math.max(0, viewport.scrollTop / viewport.clientHeight))
      const easedProgress = progress * progress * (3 - 2 * progress)
      const viewportY = topOffset + (viewport.clientHeight * 0.5 - topOffset) * easedProgress
      const y = Math.max(start, Math.min(height - endMargin, viewport.scrollTop - pinnedOffset + viewportY))
      const segmentHeight = (height - start - endMargin) / sections
      const segmentPosition = (y - start) / segmentHeight
      const segment = Math.min(sections - 1, Math.floor(segmentPosition))
      const t = Math.min(1, segmentPosition - segment)
      const eased = t * t * (3 - 2 * t)
      dotX.set(xAt(segment) + (xAt(segment + 1) - xAt(segment)) * eased)
      dotY.set(y)
      const section = impactSection?.current
      const target = impactTarget?.current
      if (section && target) {
        const viewportTop = viewport.getBoundingClientRect().top + viewport.clientTop
        const sectionTop = section.getBoundingClientRect().top - viewportTop + viewport.scrollTop
        const reachedSection = y + pinnedOffset + 16 * scale.get() >= sectionTop
        if (reachedSection !== atSection.current) {
          atSection.current = reachedSection
          onSectionContact?.(reachedSection)
        }
        dotColor.set(sectionActive && y + pinnedOffset >= sectionTop && y + pinnedOffset < sectionTop + section.offsetHeight ? '#fafaf5' : '#000')
        const photosTop = target.getBoundingClientRect().top - viewportTop + viewport.scrollTop
        const maxGrowth = 3
        const dotContentY = y + pinnedOffset
        const approach = Math.max(0, Math.min(1, (dotContentY - sectionTop) / Math.max(1, photosTop - sectionTop)))
        if (dotContentY < sectionTop && touchingSection.current) {
          touchingSection.current = false
          impact?.set(0)
        }
        buildup.set(reducedMotion || touchingSection.current ? 1 : 1 + (maxGrowth - 1) * approach * approach)
        const bounds = viewport.getBoundingClientRect()
        const centerX = bounds.left + viewport.clientLeft + dotX.get() - viewport.scrollLeft
        const centerY = viewportTop + dotContentY - viewport.scrollTop
        const radius = 16 * scale.get() * buildup.get()
        // Test the rendered photos, including their zoom and translation, rather than their wrapper.
        const contact = Array.from(target.querySelectorAll('img')).some(photo => {
          const rect = photo.getBoundingClientRect()
          const closestX = Math.max(rect.left, Math.min(centerX, rect.right))
          const closestY = Math.max(rect.top, Math.min(centerY, rect.bottom))
          return Math.hypot(centerX - closestX, centerY - closestY) <= radius
        })
        if (contact && !touchingSection.current) {
          touchingSection.current = true
          impact?.set((impact?.get() ?? 0) + 1)
          buildup.set(1)
          if (!reducedMotion) {
            const explosion = { id: ++burstId.current, x: dotX.get(), y, explosion: true }
            setBursts(previous => [...previous, explosion])
          }
        }
      }
      const bounds = viewport.getBoundingClientRect()
      position?.set({
        x: bounds.left + viewport.clientLeft + dotX.get() - viewport.scrollLeft,
        y: bounds.top + viewport.clientTop + y + pinnedOffset - viewport.scrollTop,
      })
    }
    const onScroll = () => {
      if (!reducedMotion) {
        scaleTarget.set(1.3)
        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => scaleTarget.set(1), 140)
      }
      if (!frame) frame = requestAnimationFrame(() => {
        updateDot()
        const now = performance.now()
        if (!reducedMotion && now - lastSpark >= 120) {
          lastSpark = now
          const burst = { id: ++burstId.current, x: dotX.get(), y: dotY.get() }
          setBursts(previous => [...previous.filter(item => item.explosion), ...previous.filter(item => !item.explosion).slice(-3), burst])
        }
      })
    }
    const content = Array.from(viewport.children).filter(child => {
      const position = getComputedStyle(child).position
      return child !== ref.current && position !== 'fixed' && position !== 'absolute'
    }) as HTMLElement[]
    const measure = () => {
      width = viewport.clientWidth
      const contentHeight = Math.max(viewport.clientHeight, ...content.map(child => child.offsetTop + child.offsetHeight))
      height = Math.max(viewport.clientHeight, contentHeight - viewport.clientHeight)
      const section = impactSection?.current
      if (section) {
        const top = section.offsetTop - viewport.clientHeight
        setSectionBand(previous => previous.top === top && previous.height === section.offsetHeight ? previous : { top, height: section.offsetHeight })
      }
      const heading = section?.querySelector('h2')?.parentElement
      const paragraph = section?.querySelector('p')
      if (heading && paragraph) {
        const viewportRect = viewport.getBoundingClientRect()
        const titleRect = heading.getBoundingClientRect()
        const paragraphRect = paragraph.getBoundingClientRect()
        const left = Math.min(titleRect.left, paragraphRect.left)
        const top = Math.min(titleRect.top, paragraphRect.top)
        const bounds = {
          x: left - viewportRect.left - viewport.clientLeft + viewport.scrollLeft,
          // The line includes the intro's one-viewport pinned offset.
          y: top - viewportRect.top - viewport.clientTop + viewport.scrollTop - viewport.clientHeight,
          width: Math.max(titleRect.right, paragraphRect.right) - left,
          height: Math.max(titleRect.bottom, paragraphRect.bottom) - top,
        }
        setTextBounds(previous => previous && previous.x === bounds.x && previous.y === bounds.y && previous.width === bounds.width && previous.height === bounds.height ? previous : bounds)
      }
      const pathHeight = Math.max(1, height - start - endMargin)
      sections = Math.max(2, Math.ceil(pathHeight / Math.max(480, viewport.clientHeight * 0.85)))
      const segmentHeight = pathHeight / sections
      let path = `M ${xAt(0)} ${start}`
      for (let index = 0; index < sections; index++) {
        const y = start + index * segmentHeight
        path += ` C ${xAt(index)} ${y + segmentHeight / 3}, ${xAt(index + 1)} ${y + segmentHeight * 2 / 3}, ${xAt(index + 1)} ${y + segmentHeight}`
      }
      setGeometry(previous => previous.width === width && previous.height === height && previous.path === path ? previous : { width, height, path })
      updateDot()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    content.forEach(child => observer.observe(child))
    viewport.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(idleTimer)
      scaleTarget.set(1)
      position?.set(null)
      observer.disconnect()
      viewport.removeEventListener('scroll', onScroll)
    }
  }, [container, dotX, dotY, lineOffset, position, reducedMotion, scaleTarget, scale, buildup, impactSection, impactTarget, impact, onSectionContact, sectionActive, dotColor])

  return (
    <motion.svg ref={ref} style={{ y: lineOffset }} aria-hidden="true" width={geometry.width} height={geometry.height} className="pointer-events-none absolute left-0 top-0 z-0 overflow-hidden" fill="none">
      <defs>
        <clipPath id={sectionClipId}><rect x={0} y={sectionBand.top} width={geometry.width} height={sectionBand.height} /></clipPath>
        <mask id={lineMaskId} maskUnits="userSpaceOnUse" x={0} y={0} width={geometry.width} height={geometry.height} style={{ maskType: 'luminance' }}>
          <rect width={geometry.width} height={geometry.height} fill="white" />
          {textBounds && <rect {...textBounds} fill="black" opacity={0.88} />}
        </mask>
      </defs>
      <path d={geometry.path} stroke="#000" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" mask={`url(#${lineMaskId})`} />
      {sectionActive && <path d={geometry.path} stroke="#fafaf5" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" clipPath={`url(#${sectionClipId})`} mask={`url(#${lineMaskId})`} />}
      {!reducedMotion && bursts.map(burst => (
        <motion.g
          key={burst.id}
          transform={`translate(${burst.x} ${burst.y})`}
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: burst.explosion ? 0.8 : 0.42, times: [0, 0.55, 1] }}
          onAnimationComplete={() => setBursts(previous => previous.filter(item => item.id !== burst.id))}
        >
          {burst.explosion && (
            <motion.circle
              r={12} stroke="#ffd58a" strokeWidth={3}
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 12, opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          )}
          {Array.from({ length: burst.explosion ? 32 : 9 }, (_, index) => {
            const angle = index * Math.PI * 2 / (burst.explosion ? 32 : 9) + burst.id * 0.7
            const dx = Math.cos(angle)
            const dy = Math.sin(angle)
            const distance = (30 + ((index * 17 + burst.id * 11) % 35)) * (burst.explosion ? 4.5 : 1)
            return (
              <motion.line
                key={index}
                x1={0} y1={0} x2={dx * (burst.explosion ? 12 : 5)} y2={dy * (burst.explosion ? 12 : 5)}
                stroke={index % 3 === 0 ? '#ffc14d' : '#ee791d'}
                strokeWidth={index % 2 === 0 ? 1.8 : 1.2}
                strokeLinecap="round"
                initial={{ x: dx * 17, y: dy * 17, opacity: 0.9 }}
                animate={{ x: dx * distance, y: dy * distance + 10, opacity: 0 }}
                transition={{ duration: burst.explosion ? 0.5 + (index % 6) * 0.045 : 0.28 + index * 0.015, ease: 'easeOut' }}
              />
            )
          })}
        </motion.g>
      ))}
      <g mask={`url(#${lineMaskId})`}>
        <motion.g style={{ x: dotX, y: dotY }}>
          <motion.polygon points={starPoints} style={{ fill: dotColor, rotate: rotation, scale: reducedMotion ? 1 : dotScale }} />
        </motion.g>
      </g>
    </motion.svg>
  )
}
