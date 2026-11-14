"use client"

import Image from "next/image"
import { useRef, useState, type RefObject } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"

const images = [
  { file: "fibo-logo.png", alt: "Fibonacci logo", width: 415, height: 587 },
  { file: "fibo-poster-2.png", alt: "Fibonacci poster", width: 413, height: 587 },
  { file: "fibo-poster.png", alt: "Fibonacci merkposter", width: 415, height: 587 },
  { file: "fibo-socials.png", alt: "Fibonacci social media", width: 587, height: 391 },
  { file: "fibo-straat.png", alt: "Fibonacci in het straatbeeld", width: 587, height: 391 },
]
type ProjectImage = typeof images[number]
const source = (image: ProjectImage) => `/_backup_images_2026-05-17/${image.file}`

const gridImages = images.slice(1)

function GridButton({ image, className = '', onOpen }: { image: ProjectImage; className?: string; onOpen: (image: ProjectImage, trigger: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      aria-label={`${image.alt} vergroten`}
      onClick={event => onOpen(image, event.currentTarget)}
      className={`relative w-full cursor-pointer bg-[#f0f0f0] transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${className}`}
    >
      <Image src={source(image)} alt={image.alt} fill sizes="(max-width: 640px) 92vw, 50vw" className="object-contain" />
    </button>
  )
}

function ImageGrid({ onOpen }: { onOpen: (image: ProjectImage, trigger: HTMLButtonElement) => void }) {
  const [poster2, poster, socials, straat] = gridImages
  return (
    <div className="mt-6 pb-16">
      <div className="grid grid-cols-4 items-start gap-4">
        <GridButton image={poster2} className="aspect-[415/587]" onOpen={onOpen} />
        <GridButton image={poster} className="aspect-[415/587]" onOpen={onOpen} />
        <GridButton image={socials} className="col-span-2 aspect-[587/391]" onOpen={onOpen} />
      </div>
      <GridButton image={straat} className="mt-4 aspect-[587/391]" onOpen={onOpen} />
    </div>
  )
}

export default function FibonacciSection({ container, previousGallery }: { container: RefObject<HTMLDivElement | null>; previousGallery: RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const [selected, setSelected] = useState<ProjectImage | null>(null)
  const { scrollYProgress } = useScroll({ container, target: sectionRef, offset: ['start end', 'start 35%'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['100vw', '0vw'])
  const { scrollYProgress: logoProgress } = useScroll({ container, target: previousGallery, offset: ['start end', 'end start'] })
  const logoX = useTransform(logoProgress, [0.96, 1.14], ['110vw', '0vw'])
  const logoOpacity = useTransform(logoProgress, [0.96, 0.98], [0, 1])
  const open = (image: ProjectImage, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger
    setSelected(image)
  }

  return (
    <section ref={sectionRef} aria-labelledby="fibonacci-title" className="relative z-10 w-full">
      <div className="flex flex-col px-[4vw] py-4 md:py-6">
      <div className="shrink-0 overflow-hidden">
        <div className="flex w-full items-center gap-3 md:gap-8">
          <motion.h2 id="fibonacci-title" style={{ x: titleX }} className="shrink-0 text-[clamp(2.5rem,8vw,6rem)] font-black leading-none tracking-tighter">Fibonacci</motion.h2>
          <motion.button style={{ x: logoX, opacity: logoOpacity }} type="button" aria-label="Fibonacci logo vergroten" onClick={event => open(images[0], event.currentTarget)} className="min-w-0 w-[14vw] max-w-[13.75rem] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            <svg viewBox="110 190 200 200" role="img" aria-label="Fibonacci logo" className="block h-auto w-full">
              <image href={source(images[0])} width="415" height="587" />
            </svg>
          </motion.button>
        </div>
      </div>
      <p className="mt-4 max-w-2xl shrink-0 text-xs md:text-sm font-medium leading-relaxed normal-case">
        Voor dit project ontwikkelde ik een merkconcept voor een nieuwe iced coffee in blik. Het merk heet Fibonacci en richt zich op ingenieurs en hoogopgeleide mensen die houden van structuur en precisie. Het logo toont een geit met een Fibonacci-spiraal in de hoorn, gebaseerd op de legende dat een geit als eerste de koffieboon ontdekte. De baseline: &quot;Wisdom in every drop.&quot; Ik werkte het volledige merk uit: logo, kleuren, typografie, blikdesign en posters.
      </p>
      <ImageGrid onOpen={open} />
      </div>
      <Dialog.Root open={selected !== null} onOpenChange={isOpen => { if (!isOpen) setSelected(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[10020] bg-black/90" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[10021] h-[80dvh] w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none"
            onCloseAutoFocus={event => { event.preventDefault(); lastTrigger.current?.focus({ preventScroll: true }) }}
          >
            <Dialog.Title className="sr-only">{selected?.alt ?? 'Fibonacci afbeelding'}</Dialog.Title>
            {selected && <Image src={source(selected)} alt={selected.alt} fill sizes="90vw" className="object-contain" />}
            <Dialog.Close aria-label="Afbeelding sluiten" className="absolute -top-10 right-0 flex h-10 w-10 items-center justify-center bg-white text-3xl text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
