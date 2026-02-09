'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function TypewriterText({ text, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0
    let interval

    const typeText = () => {
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1))
        index++
        if (index >= text.length) {
          clearInterval(interval)
          // Loop: wacht 5 seconden en start opnieuw
          setTimeout(() => {
            index = 0
            setDisplayedText('')
            typeText()
          }, 5000)
        }
      }, speed)
    }

    typeText()
    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayedText}</span>
}

export default function HomePage() {
  return (
    <div className="flex justify-center pt-12">
      <div className="max-w-4xl space-y-6 text-center">
      <h1 className="text-4xl font-bold animate-float">Welcome to my portfolio</h1>
      <p className="text-lg text-gray-700">
        <TypewriterText text="This is the Home page. Explore my projects." speed={40} />
      </p>
      <Link href="/project">
        <button className="px-4 py-2 bg-yellow-200 text-gray-800 rounded hover:bg-yellow-300">
          Get Started
        </button>
      </Link>
      </div>
    </div>
  )
}
