"use client"

import { useEffect, useState, type RefObject } from "react"
import styles from "./ScrollHint.module.css"

export default function ScrollHint({ container, ready }: { container: RefObject<HTMLDivElement | null>; ready: boolean }) {
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    const viewport = container.current
    if (!viewport) return
    const check = () => setCanScroll(viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop > 6)
    const observer = new ResizeObserver(check)
    observer.observe(viewport)
    Array.from(viewport.children).forEach(child => observer.observe(child))
    viewport.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()
    return () => {
      observer.disconnect()
      viewport.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [container])

  if (!ready || !canScroll) return null

  return (
    <button
      type="button"
      aria-label="Scroll verder naar beneden"
      className={styles.hint}
      onClick={() => {
        const viewport = container.current
        viewport?.scrollBy({ top: viewport.clientHeight * 0.65, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      }}
    >
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v15M5 12l7 7 7-7" />
      </svg>
    </button>
  )
}
