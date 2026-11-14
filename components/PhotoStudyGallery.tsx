"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type RefObject } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, useAnimationControls, type MotionValue } from "framer-motion"

const photos = [5001, 5002, 5007, 5008, 5009, 5019]


export default function PhotoStudyGallery({ container, impact }: { container: RefObject<HTMLDivElement | null>; impact?: MotionValue<number> }) {
  const shockwave = useAnimationControls()
  const [selected, setSelected] = useState<number | null>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const fitScale = useMotionValue(1)
  const centerOffset = useMotionValue(0)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress, scrollY } = useScroll({ container, target: galleryRef, offset: ['start end', 'end start'] })
  const spotlight = useTransform(() => {
    const ease = (value: number) => {
      const t = Math.max(0, Math.min(1, value))
      return t * t * t * (t * (t * 6 - 15) + 10)
    }
    const progress = scrollYProgress.get()
    return ease((progress - 0.32) / 0.30) * (1 - ease((progress - 0.68) / 0.24))
  })
  const scale = useTransform(() => reducedMotion ? 1 : 1 + spotlight.get() * (fitScale.get() - 1))
  const y = useTransform(() => reducedMotion ? 0 : spotlight.get() * centerOffset.get())
  const blur = useTransform(spotlight, value => `blur(${reducedMotion ? 0 : value * 8}px)`)
  const overlayOpacity = useTransform(spotlight, value => reducedMotion ? 0 : value)
  const entryLeft = useTransform(scrollYProgress, [0, 0.18], ['-100vw', '0vw'])
  const entryRight = useTransform(scrollYProgress, [0, 0.18], ['100vw', '0vw'])

  useEffect(() => {
    if (!impact || reducedMotion) return
    const unsubscribe = impact.on('change', value => {
      if (value === 0) return
      shockwave.stop()
      shockwave.set('rest')
      void shockwave.start('burst')
    })
    return () => {
      unsubscribe()
      shockwave.stop()
    }
  }, [impact, reducedMotion, shockwave])

  useEffect(() => {
    const measure = () => {
    const viewport = container.current
    const wrapper = galleryRef.current
    const grid = gridRef.current
    if (!viewport || !wrapper || !grid || !grid.offsetWidth || !grid.offsetHeight) return
    const margin = viewport.clientWidth < 640 ? 12 : 20
    const maximumScale = Math.min(
      (viewport.clientWidth - margin * 2) / grid.offsetWidth,
      (viewport.clientHeight - margin * 2) / grid.offsetHeight,
    )
    // Equal horizontal and vertical margins where the screen and image ratios allow it.
    const dimensionDifference = grid.offsetWidth - grid.offsetHeight
    const balancedScale = dimensionDifference === 0 ? maximumScale :
      (viewport.clientWidth - viewport.clientHeight) / dimensionDifference
    fitScale.set(balancedScale >= 1 && balancedScale <= maximumScale ? balancedScale : maximumScale)
    const viewportCenter = viewport.getBoundingClientRect().top + viewport.clientHeight / 2
    const galleryCenter = wrapper.getBoundingClientRect().top + grid.offsetHeight / 2
    centerOffset.set(viewportCenter - galleryCenter)
    }
    const unsubscribe = scrollY.on('change', measure)
    const observer = new ResizeObserver(measure)
    if (container.current) observer.observe(container.current)
    if (gridRef.current) observer.observe(gridRef.current)
    measure()
    return () => { observer.disconnect(); unsubscribe() }
  }, [container, fitScale, centerOffset, scrollY])


  return (
    <>
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] bg-black" style={{ backdropFilter: blur, WebkitBackdropFilter: blur, opacity: overlayOpacity }} />
      <div ref={galleryRef}>
      <motion.div ref={gridRef} style={{ scale, y }} className="relative z-[100] mx-auto grid w-full max-w-[calc(54dvh-8px)] grid-cols-2 items-start gap-2 sm:max-w-[calc(121.5dvh-3px)] sm:grid-cols-3 sm:gap-3">
        {photos.map((number, index) => (
          <motion.div
            key={number}
            className="min-w-0"
            custom={index}
            initial="rest"
            animate={shockwave}
            variants={{
              rest: { x: 0, y: 0, rotate: 0, scale: 1 },
              burst: (photoIndex: number) => {
                const columns = (container.current?.clientWidth ?? 640) < 640 ? 2 : 3
                const direction = photoIndex % columns - (columns - 1) / 2
                const x = direction * 18
                const y = Math.floor(photoIndex / columns) === 0 ? -18 : 22
                const tilt = (photoIndex % 2 === 0 ? -1 : 1) * 2.5
                return {
                  x: [0, x, -x * 0.12, 0],
                  y: [0, y, -y * 0.1, 0],
                  rotate: [0, tilt, -tilt * 0.15, 0],
                  scale: [1, 1.035, 0.995, 1],
                  transition: {
                    duration: 1.25,
                    delay: photoIndex * 0.025,
                    times: [0, 0.18, 0.52, 1],
                    ease: 'easeInOut',
                  },
                }
              },
            }}
          >
          <motion.button style={{ x: reducedMotion ? 0 : index % 2 === 0 ? entryLeft : entryRight }} type="button" aria-label={`Foto ${number} in het groot bekijken`} onClick={event => { trigger.current = event.currentTarget; setSelected(number) }} className="block w-full min-w-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            <Image src={`/IMG_${number}.PNG`} alt={`Fotostudie Cartier-Bresson — foto ${number}`} width={number === 5002 ? 4278 : 6000} height={number === 5002 ? 2851 : 4000} sizes="(max-width: 639px) 50vw, 34vw" loading="eager" className="block h-auto w-full" />
          </motion.button>
          </motion.div>
        ))}
      </motion.div>
      </div>
      <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[10020] bg-black/90" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[10021] h-[80dvh] w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none"
            onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus({ preventScroll: true }) }}
          >
            <Dialog.Title className="sr-only">Fotostudie — foto {selected}</Dialog.Title>
            {selected !== null && <Image src={`/IMG_${selected}.PNG`} alt={`Foto ${selected}, vergroot`} fill sizes="90vw" className="object-contain" />}
            <Dialog.Close aria-label="Foto sluiten" className="absolute -top-10 right-0 flex h-10 w-10 items-center justify-center bg-white text-3xl text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
