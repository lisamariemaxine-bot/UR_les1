"use client"

import Image from "next/image"
import { useRef, useState, type RefObject } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"

const images = [
  { file: "doosal.png", alt: "Acoustic laptop: houten doos met voorwerpen", width: 587, height: 415 },
  { file: "krabbels.png", alt: "Schetsen van de visuele score", width: 417, height: 587 },
  { file: "partii.png", alt: "Visuele score", width: 587, height: 438 },
  { file: "spelen.png", alt: "Iemand bespeelt de acoustic laptop", width: 532, height: 587 },
  { file: "bts.png", alt: "Achter de schermen", width: 587, height: 428 },
]
type ProjectImage = typeof images[number]
const source = (image: ProjectImage) => `/_backup_images_2026-05-17/${image.file}`

function GridButton({ image, className = '', onOpen }: { image: ProjectImage; className?: string; onOpen: (image: ProjectImage, trigger: HTMLButtonElement) => void }) {
  return (
    <button
      type="button"
      aria-label={`${image.alt} vergroten`}
      onClick={event => onOpen(image, event.currentTarget)}
      style={{ aspectRatio: `${image.width}/${image.height}` }}
      className={`relative w-full cursor-pointer bg-[#f0f0f0] transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${className}`}
    >
      <Image src={source(image)} alt={image.alt} fill sizes="(max-width: 640px) 92vw, 50vw" className="object-contain" />
    </button>
  )
}

export default function AcousticLaptopSection({ container }: { container: RefObject<HTMLDivElement | null> }) {
  const sectionRef = useRef<HTMLElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const [selected, setSelected] = useState<ProjectImage | null>(null)
  const { scrollYProgress } = useScroll({ container, target: sectionRef, offset: ['start end', 'start 35%'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['100vw', '0vw'])
  const open = (image: ProjectImage, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger
    setSelected(image)
  }
  const [main, krabbels, partii, spelen, bts] = images

  return (
    <section ref={sectionRef} aria-labelledby="acoustic-title" className="relative z-10 w-full">
      <div className="flex flex-col px-[4vw] py-4 md:py-6">
        <div className="shrink-0 overflow-hidden">
          <motion.h2 id="acoustic-title" style={{ x: titleX }} className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-none tracking-tighter">Acoustic Laptop</motion.h2>
        </div>
        <p className="mt-4 max-w-2xl shrink-0 text-xs md:text-sm font-medium leading-relaxed normal-case">
          Voor dit project bouwde ik een acoustic laptop: een zelfgemaakte houten doos gevuld met voorwerpen zoals een kam, buizen, belletjes en een vork. Door erop te tikken, te wrijven of erin te roeren ontstaan verschillende klanken. Daarnaast ontwierp ik een visuele score: een grafische partituur die aangeeft hoe iemand het instrument moet bespelen. Ik testte dit met verschillende personen en paste de score steeds aan op basis van hun feedback. Het eindresultaat is een duidelijk pad met symbolen voor luid, zacht en herhaling.
        </p>
        <div className="mt-6 pb-16">
          <GridButton image={main} onOpen={open} />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 items-start gap-4">
            <GridButton image={krabbels} onOpen={open} />
            <GridButton image={partii} onOpen={open} />
            <GridButton image={spelen} onOpen={open} />
            <GridButton image={bts} onOpen={open} />
          </div>
        </div>
      </div>
      <Dialog.Root open={selected !== null} onOpenChange={isOpen => { if (!isOpen) setSelected(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[10020] bg-black/90" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[10021] h-[80dvh] w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none"
            onCloseAutoFocus={event => { event.preventDefault(); lastTrigger.current?.focus({ preventScroll: true }) }}
          >
            <Dialog.Title className="sr-only">{selected?.alt ?? 'Acoustic Laptop afbeelding'}</Dialog.Title>
            {selected && <Image src={source(selected)} alt={selected.alt} fill sizes="90vw" className="object-contain" />}
            <Dialog.Close aria-label="Afbeelding sluiten" className="absolute -top-10 right-0 flex h-10 w-10 items-center justify-center bg-white text-3xl text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
