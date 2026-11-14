"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type RefObject } from "react"
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion"
import styles from "./FloatingPhotos.module.css"
import * as Dialog from "@radix-ui/react-dialog"

const photos = [5001, 5002, 5007, 5008, 5009, 5019]
const aspectRatios = [1.5, 4278 / 2851, 1.5, 1.5, 1.5, 1.5]
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress
const smooth = (value: number) => {
  const p = Math.max(0, Math.min(1, value))
  return p * p * (3 - 2 * p)
}

function FloatingPhoto({ number, index, progress, scrollOffset, clock, width, height, rowCenter, rowHeight, onOpen }: {
  number: number
  index: number
  progress: MotionValue<number>
  scrollOffset: MotionValue<number>
  clock: MotionValue<number>
  width: MotionValue<number>
  height: MotionValue<number>
  rowCenter: MotionValue<number>
  rowHeight: MotionValue<number>
  onOpen: (number: number, trigger: HTMLButtonElement) => void
}) {
  const phase = useTransform(() => (clock.get() + index * 10) % 60)
  const slot = () => {
    const viewportWidth = Math.max(1, width.get())
    const areaHeight = Math.max(1, rowHeight.get())
    const columns = viewportWidth < 640 ? 2 : 3
    const rows = Math.ceil(photos.length / columns)
    const gap = viewportWidth < 640 ? 8 : 12
    const rowRatios = Array.from({ length: rows }, (_, row) =>
      aspectRatios.slice(row * columns, (row + 1) * columns).reduce((sum, ratio) => sum + ratio, 0)
    )
    // Fit the actual image proportions, so contain adds no hidden whitespace.
    const reciprocalSum = rowRatios.reduce((sum, ratio) => sum + 1 / ratio, 0)
    const availableHeight = Math.max(1, areaHeight - gap * (rows - 1))
    const groupWidth = Math.min(viewportWidth * 0.92, availableHeight / reciprocalSum + gap * (columns - 1))
    const rowHeights = rowRatios.map(ratio => Math.max(1, (groupWidth - gap * (columns - 1)) / ratio))
    const groupHeight = rowHeights.reduce((sum, value) => sum + value, 0) + gap * (rows - 1)
    const row = Math.floor(index / columns)
    const column = index % columns
    const imageHeight = rowHeights[row]
    const previousWidths = aspectRatios.slice(row * columns, index).reduce((sum, ratio) => sum + ratio * imageHeight, 0)
    const previousHeights = rowHeights.slice(0, row).reduce((sum, value) => sum + value, 0)
    return {
      x: ((viewportWidth - groupWidth) / 2 + previousWidths + column * gap) / viewportWidth,
      y: ((areaHeight - groupHeight) / 2 + previousHeights + row * gap + imageHeight / 2) / areaHeight,
      w: imageHeight * aspectRatios[index] / viewportWidth,
      h: imageHeight / areaHeight,
    }
  }
  const blend = useTransform(() => smooth((progress.get() - 0.30) / 0.05))
  const landingTop = () => rowCenter.get() + rowHeight.get() * (slot().y - 0.5 - slot().h / 2)
  const x = useTransform(() => {
    const start = phase.get() < 30 ? -0.25 + 1.3 * phase.get() / 30 : -0.25
    const offscreen = index % 2 === 0 ? -0.55 : 1.05
    if (progress.get() <= 0.30) return width.get() * mix(start, offscreen, smooth(progress.get() / 0.30))
    // Bring every image in together, before the full group enters the viewport.
    const groupTop = rowCenter.get() - rowHeight.get() / 2
    const entry = smooth((scrollOffset.get() + height.get() - groupTop) / Math.max(1, height.get() * 0.15))
    return width.get() * mix(offscreen, slot().x, entry)
  })
  const flightHeight = () => Math.max(50, height.get() * 0.21 - 11.34)
  const photoHeight = useTransform(() => mix(flightHeight(), rowHeight.get() * slot().h, blend.get()))
  const y = useTransform(() => {
    const start = height.get() * 0.5 + (height.get() * 0.5 - flightHeight() - 44) * [0.03, 0.43, 0.16, 0.69, 0.29, 0.56][index]
    const end = landingTop()
    return mix(start, end, blend.get())
  })
  const photoWidth = useTransform(() => width.get() * mix((14 + (index * 3) % 7) / 100, slot().w, blend.get()))
  // Section two owns a permanent gallery; these are only the introductory floating images.
  const opacity = useTransform(() => progress.get() <= 0.30 && phase.get() < 30 ? 1 : 0)
  const visibility = useTransform(() => opacity.get() > 0 && x.get() + photoWidth.get() > 0 && x.get() < width.get() ? 'visible' as const : 'hidden' as const)

  return (
    <motion.button type="button" aria-label={`Foto ${number} in het groot bekijken`} onClick={event => onOpen(number, event.currentTarget)} className={styles.photo} style={{ x, y, width: photoWidth, height: photoHeight, opacity, visibility }}>
      <Image src={`/IMG_${number}.PNG`} alt={`Portfoliofoto ${number}`} fill loading="eager" sizes="(max-width: 639px) 50vw, 32vw" className={styles.image} />
    </motion.button>
  )
}

export default function FloatingPhotos({ progress, scrollOffset, rowRef }: { progress: MotionValue<number>; scrollOffset: MotionValue<number>; rowRef: RefObject<HTMLDivElement | null> }) {
  const [paused, setPaused] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const clock = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const rowCenter = useMotionValue(0)
  const rowHeight = useMotionValue(0)
  const galleryHeight = useMotionValue(0)
  const controlOpacity = useTransform(progress, [0, 0.15], [1, 0])

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const measure = () => {
      width.set(parent.clientWidth)
      height.set(parent.clientHeight)
      const row = rowRef.current
      if (row) {
        const rowTop = row.getBoundingClientRect().top - parent.getBoundingClientRect().top
        rowCenter.set(rowTop + row.clientHeight / 2)
        rowHeight.set(row.clientHeight)
        galleryHeight.set(rowTop + row.clientHeight + 32)
      }
    }
    const observer = new ResizeObserver(measure)
    observer.observe(parent)
    if (rowRef.current) observer.observe(rowRef.current)
    if (rowRef.current?.parentElement) observer.observe(rowRef.current.parentElement)
    measure()
    return () => observer.disconnect()
  }, [width, height, rowRef, rowCenter, rowHeight, galleryHeight])

  useAnimationFrame((_, delta) => {
    // Freeze the flight positions while scrolling so each photo follows a stable path to its place in the row.
    if (!paused && selectedPhoto === null && !reducedMotion && progress.get() <= 0.001) clock.set(clock.get() + delta / 1000)
  })

  return (
    <>
      <motion.div ref={ref} className={styles.gallery} style={{ height: galleryHeight }}>
        {photos.map((number, index) => (
          <FloatingPhoto key={number} number={number} index={index} progress={progress} scrollOffset={scrollOffset} clock={clock} width={width} height={height} rowCenter={rowCenter} rowHeight={rowHeight} onOpen={(photo, trigger) => { lastTrigger.current = trigger; setSelectedPhoto(photo) }} />
        ))}
      </motion.div>
      <motion.button
        type="button"
        className={styles.pause}
        style={{ opacity: controlOpacity }}
        onClick={() => setPaused(value => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Fotobeweging hervatten" : "Fotobeweging pauzeren"}
      >
        {paused ? 'Afspelen' : 'Pauze'}
      </motion.button>
      <Dialog.Root open={selectedPhoto !== null} onOpenChange={open => { if (!open) setSelectedPhoto(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[10020] bg-black/90" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[10021] h-[80dvh] w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none"
            onCloseAutoFocus={event => { event.preventDefault(); lastTrigger.current?.focus({ preventScroll: true }) }}
          >
            <Dialog.Title className="sr-only">Portfoliofoto {selectedPhoto}</Dialog.Title>
            {selectedPhoto !== null && <Image src={`/IMG_${selectedPhoto}.PNG`} alt={`Portfoliofoto ${selectedPhoto}, vergroot`} fill sizes="90vw" className="object-contain" />}
            <Dialog.Close aria-label="Foto sluiten" className="absolute -top-10 right-0 flex h-10 w-10 items-center justify-center bg-white text-3xl text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
