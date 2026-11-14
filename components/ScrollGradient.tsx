"use client"

import type { RefObject } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import styles from "./ScrollGradient.module.css"

export default function ScrollGradient({ container }: { container: RefObject<HTMLDivElement | null> }) {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ container })
  const progress = useSpring(scrollYProgress, { stiffness: 45, damping: 25 })
  const warmX = useTransform(progress, [0, 0.5, 1], ['-12%', '14%', '-4%'])
  const warmY = useTransform(progress, [0, 1], ['-12%', '18%'])
  const coolX = useTransform(progress, [0, 1], ['12%', '-18%'])
  const coolY = useTransform(progress, [0, 0.5, 1], ['15%', '-12%', '5%'])

  return (
    <div aria-hidden="true" className={styles.background}>
      <motion.div className={styles.layer} style={{ x: reducedMotion ? 0 : warmX, y: reducedMotion ? 0 : warmY }}>
        <div className={styles.warm} />
      </motion.div>
      <motion.div className={styles.layer} style={{ x: reducedMotion ? 0 : coolX, y: reducedMotion ? 0 : coolY }}>
        <div className={styles.cool} />
      </motion.div>
      <div className={styles.paperLight} />
    </div>
  )
}
