"use client"

import Image from "next/image"
import { useState } from "react"
import styles from "./HeroPhoto.module.css"

export default function HeroPhoto() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-1/2 border-[32px] border-[#FFFFFF] overflow-hidden pointer-events-none">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src="/IMG_5002.PNG"
          alt=""
          fill
          priority
          sizes="50vw"
          onLoad={() => setLoaded(true)}
          className={`${styles.photo} ${loaded ? styles.glitch : ''}`}
        />
      </div>
    </div>
  )
}
