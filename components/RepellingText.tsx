"use client"

import { useEffect, useRef } from "react"
import type { MotionValue } from "framer-motion"
import styles from "./RepellingText.module.css"

export default function RepellingText({ text, wavePosition }: { text: string; wavePosition?: MotionValue<{ x: number; y: number } | null> }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let pointer: { x: number; y: number } | null = null
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const reset = () => {
      pointer = null
      scheduleUpdate()
    }
    const update = () => {
      frame = 0
      for (const slot of root.children) {
        const glyph = slot.firstElementChild as HTMLElement | null
        if (!glyph) continue
        // Measure the stationary slot, so the moving letter never chases itself.
        const rect = slot.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        // Use the nearest source so the wave and mouse share the same hover effect.
        const sources = [pointer, wavePosition?.get()].filter(
          (source): source is { x: number; y: number } => source != null
        )
        const source = sources.reduce<{ x: number; y: number } | null>((nearest, candidate) =>
          !nearest || Math.hypot(centerX - candidate.x, centerY - candidate.y) < Math.hypot(centerX - nearest.x, centerY - nearest.y)
            ? candidate : nearest, null)
        if (!source) {
          glyph.style.transform = 'translate3d(0, 0, 0) rotate(0deg)'
          continue
        }
        const dx = centerX - source.x
        const dy = centerY - source.y
        const distance = Math.hypot(dx, dy)
        const radius = Math.min(140, Math.max(65, rect.height * 1.5))
        const force = Math.max(0, 1 - distance / radius) ** 2
        const amount = Math.min(60, rect.height * 0.8) * force
        const offsetX = distance > 1 ? dx / distance * amount : 0
        const offsetY = distance > 1 ? dy / distance * amount : -amount
        const x = Math.max(4 - rect.left, Math.min(window.innerWidth - rect.right - 4, offsetX))
        glyph.style.transform = `translate3d(${force ? x : 0}px, ${offsetY}px, 0) rotate(${force * (dx < 0 ? -8 : 8)}deg)`
      }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
      pointer = { x: event.clientX, y: event.clientY }
      scheduleUpdate()
    }
    const unsubscribe = wavePosition?.on('change', scheduleUpdate)
    scheduleUpdate()
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    window.addEventListener('scroll', reset, true)
    return () => {
      unsubscribe?.()
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      window.removeEventListener('scroll', reset, true)
    }
  }, [wavePosition])

  return (
    <span ref={ref} aria-label={text} className={styles.word}>
      {Array.from(text).map((character, index) => (
        <span key={index} aria-hidden="true" className={styles.slot}>
          <span data-glyph className={styles.glyph}>{character === ' ' ? '\u00a0' : character}</span>
        </span>
      ))}
    </span>
  )
}
