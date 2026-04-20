"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Baloo_2 } from "next/font/google"

type Mode = "launch" | "lesson" | "quiz" | "mapQuiz" | "complete"

type WeatherStation = {
  id: string
  label: string
  icon: string
  angle: number
  accent: string
  ringClass: string
  skyClass: string
  lessonTitle: string
  lessonText: string
  question: string
  options: string[]
  answer: string
}

type MapQuiz = {
  question: string
  options: string[]
  answer: string
  mapHint: string
}

type MapCityForecast = {
  city: string
  label: string
}

const kidsFont = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const WEATHER_STATIONS: WeatherStation[] = [
  {
    id: "sun",
    label: "Zon",
    icon: "☀️",
    angle: 330,
    accent: "#ff9f1c",
    ringClass: "from-[#ffd25c] via-[#ffb703] to-[#fb8500]",
    skyClass: "from-[#fff6b6] via-[#ffd06b] to-[#ff9a44]",
    lessonTitle: "Zonnig weer",
    lessonText: "Zonnige dagen ontstaan als dikke wolken wegtrekken en zonlicht de grond kan bereiken. De zon verwarmt de aarde, het water en de lucht.",
    question: "Waardoor voelt een zonnige dag warm aan?",
    options: ["Maanlicht", "Zonlicht", "Sneeuwvlokken"],
    answer: "Zonlicht",
  },
  {
    id: "lightning",
    label: "Bliksem",
    icon: "⚡",
    angle: 270,
    accent: "#8d5cff",
    ringClass: "from-[#d6c2ff] via-[#8d5cff] to-[#3f37c9]",
    skyClass: "from-[#0f1028] via-[#27264f] to-[#5f5bd4]",
    lessonTitle: "Onweer en bliksem",
    lessonText: "Bliksem is een enorme vonk van elektriciteit in de lucht. Het ontstaat in onweerswolken die vol energie zitten.",
    question: "Bliksem is het best te omschrijven als...",
    options: ["Een grote plens regen", "Een vonk van elektriciteit", "Een regenboogstraal"],
    answer: "Een vonk van elektriciteit",
  },
  {
    id: "rain",
    label: "Regen",
    icon: "🌧️",
    angle: 210,
    accent: "#2497ff",
    ringClass: "from-[#a9ddff] via-[#57b7ff] to-[#0f6ad8]",
    skyClass: "from-[#0f3d68] via-[#1f7ab8] to-[#6ac4ff]",
    lessonTitle: "Regenwolken",
    lessonText: "Regen ontstaat als kleine waterdruppeltjes in wolken zwaar genoeg worden om naar de aarde te vallen.",
    question: "Waarom valt regen uit wolken?",
    options: ["De druppels worden te zwaar", "De wind verfschiet ze", "De zon bevriest ze"],
    answer: "De druppels worden te zwaar",
  },
  {
    id: "snow",
    label: "Sneeuw",
    icon: "❄️",
    angle: 150,
    accent: "#8ae0ff",
    ringClass: "from-[#eefaff] via-[#b8efff] to-[#71d6ff]",
    skyClass: "from-[#dff6ff] via-[#b5e7ff] to-[#7ecdf4]",
    lessonTitle: "Sneeuwvlokken",
    lessonText: "Sneeuw ontstaat als water in koude wolken bevriest tot ijskristallen. Die kristallen groeien samen en dwarrelen naar beneden.",
    question: "Sneeuw begint als...",
    options: ["Hete stoom", "IJskristallen", "Zonnestralen"],
    answer: "IJskristallen",
  },
  {
    id: "wind",
    label: "Wind",
    icon: "💨",
    angle: 90,
    accent: "#1bb89a",
    ringClass: "from-[#a0ffe3] via-[#53d9bd] to-[#149e8d]",
    skyClass: "from-[#c6fff3] via-[#8af0d6] to-[#33b79d]",
    lessonTitle: "Wind in beweging",
    lessonText: "Wind is bewegende lucht. Lucht stroomt van plaatsen met hogere luchtdruk naar plaatsen met lagere luchtdruk.",
    question: "Wind is...",
    options: ["Bewegende lucht", "Vallend water", "Een lichtstraal"],
    answer: "Bewegende lucht",
  },
  {
    id: "rainbow",
    label: "Regenboog",
    icon: "🌈",
    angle: 30,
    accent: "#ff4fa3",
    ringClass: "from-[#ff7aa8] via-[#ffd166] to-[#56cfe1]",
    skyClass: "from-[#ffe0ef] via-[#fff2b1] to-[#c6f7ff]",
    lessonTitle: "Regenboogkleuren",
    lessonText: "Een regenboog verschijnt als zonlicht door regendruppels schijnt. De druppels splitsen het licht op in veel kleuren.",
    question: "Wat zorgt voor een regenboog?",
    options: ["Zonlicht en regendruppels", "Maanlicht en sneeuw", "Donder en wind"],
    answer: "Zonlicht en regendruppels",
  },
]

const MAP_QUIZ_BY_STATION: Record<string, MapQuiz> = {
  sun: {
    question: "Waar in België schijnt de zon op de kaart?",
    options: ["Antwerpen", "Gent", "Brussel", "Hasselt"],
    answer: "Antwerpen",
    mapHint: "Zoek het zon-icoon op de kaart.",
  },
  lightning: {
    question: "Waar in België is er onweer op de kaart?",
    options: ["Antwerpen", "Gent", "Brussel", "Hasselt"],
    answer: "Hasselt",
    mapHint: "Zoek het onweer-icoon met bliksem.",
  },
  rain: {
    question: "Waar in België regent het op de kaart?",
    options: ["Antwerpen", "Gent", "Brussel", "Hasselt"],
    answer: "Gent",
    mapHint: "Zoek het regen-icoon met druppels.",
  },
  snow: {
    question: "Waar in België sneeuwt het op de kaart?",
    options: ["Antwerpen", "Gent", "Brussel", "Hasselt"],
    answer: "Brussel",
    mapHint: "Zoek het sneeuwvlok-icoon.",
  },
  wind: {
    question: "Waar in België waait het hard op de kaart?",
    options: ["Antwerpen", "Gent", "Brussel", "Hasselt"],
    answer: "Antwerpen",
    mapHint: "Zoek het wind-icoon.",
  },
  rainbow: {
    question: "Waar in België zie je een regenboog op de kaart?",
    options: ["Antwerpen", "Gent", "Brussel", "Hasselt"],
    answer: "Brussel",
    mapHint: "Zoek het regenboog-icoon.",
  },
}

const MAP_FORECAST_BY_STATION: Record<string, MapCityForecast[]> = {
  sun: [
    { city: "Antwerpen", label: "☀️ Antwerpen 16°" },
    { city: "Gent", label: "🌧️ Gent 11°" },
    { city: "Brussel", label: "🌦️ Brussel 12°" },
    { city: "Hasselt", label: "⛈️ Hasselt 9°" },
  ],
  lightning: [
    { city: "Antwerpen", label: "☁️ Antwerpen 14°" },
    { city: "Gent", label: "🌧️ Gent 11°" },
    { city: "Brussel", label: "🌦️ Brussel 12°" },
    { city: "Hasselt", label: "⛈️ Hasselt 9°" },
  ],
  rain: [
    { city: "Antwerpen", label: "☁️ Antwerpen 14°" },
    { city: "Gent", label: "🌧️ Gent 11°" },
    { city: "Brussel", label: "🌤️ Brussel 13°" },
    { city: "Hasselt", label: "☀️ Hasselt 15°" },
  ],
  snow: [
    { city: "Antwerpen", label: "☁️ Antwerpen 3°" },
    { city: "Gent", label: "🌧️ Gent 4°" },
    { city: "Brussel", label: "❄️ Brussel 1°" },
    { city: "Hasselt", label: "🌫️ Hasselt 2°" },
  ],
  wind: [
    { city: "Antwerpen", label: "💨 Antwerpen 13°" },
    { city: "Gent", label: "🌤️ Gent 12°" },
    { city: "Brussel", label: "☁️ Brussel 11°" },
    { city: "Hasselt", label: "🌧️ Hasselt 10°" },
  ],
  rainbow: [
    { city: "Antwerpen", label: "☀️ Antwerpen 14°" },
    { city: "Gent", label: "🌧️ Gent 11°" },
    { city: "Brussel", label: "🌈 Brussel 12°" },
    { city: "Hasselt", label: "⛅ Hasselt 13°" },
  ],
}

const ROCKET_START_ANGLE = 390
const TAP_STEP = 3

function orbitPosition(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  const x = Math.cos(radians) * radius
  const y = Math.sin(radians) * radius

  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
  }
}

function WeatherBackdrop({ stationId }: { stationId: string | null }) {
  if (stationId === "rain") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, index) => (
          <span
            key={`rain-${index}`}
            className="absolute h-16 w-[2px] rounded-full bg-white/55"
            style={{
              left: `${(index * 9) % 100}%`,
              top: `${(index * 13) % 60 - 20}%`,
              animation: `rainFall ${0.8 + (index % 5) * 0.18}s linear ${index * 0.05}s infinite`,
              opacity: 0.45 + (index % 5) * 0.08,
            }}
          />
        ))}
      </div>
    )
  }

  if (stationId === "snow") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={`snow-${index}`}
            className="absolute rounded-full bg-white/90"
            style={{
              left: `${(index * 11) % 100}%`,
              top: `${(index * 17) % 70 - 20}%`,
              width: `${6 + (index % 4) * 4}px`,
              height: `${6 + (index % 4) * 4}px`,
              animation: `snowFloat ${4 + (index % 4)}s ease-in-out ${index * 0.12}s infinite`,
            }}
          />
        ))}
      </div>
    )
  }

  if (stationId === "wind") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={`wind-${index}`}
            className="absolute h-[2px] rounded-full bg-white/70"
            style={{
              left: `${(index * 8) % 70}%`,
              top: `${18 + index * 6}%`,
              width: `${90 + (index % 3) * 50}px`,
              animation: `windSweep ${1.8 + (index % 3) * 0.3}s ease-in-out ${index * 0.1}s infinite`,
            }}
          />
        ))}
      </div>
    )
  }

  if (stationId === "sun") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/35 blur-3xl" />
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={`sun-${index}`}
            className="absolute left-[78%] top-[12%] h-1 rounded-full bg-white/80"
            style={{
              width: `${54 + index * 8}px`,
              transform: `rotate(${index * 18}deg) translateX(${40 + index * 2}px)`,
              transformOrigin: "left center",
            }}
          />
        ))}
      </div>
    )
  }

  if (stationId === "lightning") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
        <div
          className="absolute left-1/2 top-[14%] h-64 w-24 -translate-x-1/2 bg-white/80"
          style={{
            clipPath: "polygon(48% 0%, 82% 0%, 61% 36%, 84% 36%, 32% 100%, 47% 56%, 23% 56%)",
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.8))",
            animation: "lightningFlash 1.7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[28%] top-[66%] h-44 w-16 -translate-x-1/2 bg-white/80"
          style={{
            clipPath: "polygon(46% 0%, 80% 0%, 58% 34%, 82% 34%, 34% 100%, 49% 56%, 24% 56%)",
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.8))",
            animation: "lightningFlash 1.7s ease-in-out infinite",
          }}
        />
      </div>
    )
  }

  if (stationId === "rainbow") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[24%] h-[420px] w-[420px] -translate-x-1/2 rounded-full border-[18px] border-[#ff5c8a]/60" />
        <div className="absolute left-1/2 top-[26%] h-[380px] w-[380px] -translate-x-1/2 rounded-full border-[16px] border-[#ff9f1c]/60" />
        <div className="absolute left-1/2 top-[28%] h-[340px] w-[340px] -translate-x-1/2 rounded-full border-[14px] border-[#ffd166]/60" />
        <div className="absolute left-1/2 top-[30%] h-[300px] w-[300px] -translate-x-1/2 rounded-full border-[12px] border-[#90e0ef]/60" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[12%] top-[18%] h-28 w-28 rounded-full bg-white/18 blur-2xl" />
      <div className="absolute right-[10%] top-[26%] h-36 w-36 rounded-full bg-white/18 blur-2xl" />
      <div className="absolute bottom-[8%] left-[20%] h-32 w-32 rounded-full bg-white/14 blur-2xl" />
    </div>
  )
}

export default function TestPage() {
  const weatherMapRef = useRef<HTMLDivElement | null>(null)
  const lastTapRef = useRef<number>(Date.now())
  const [mode, setMode] = useState<Mode>("launch")
  const [rocketAngle, setRocketAngle] = useState(ROCKET_START_ANGLE)
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0)
  const [lessonProgress, setLessonProgress] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answerFeedback, setAnswerFeedback] = useState<string>("")
  const [selectedMapAnswer, setSelectedMapAnswer] = useState<string | null>(null)
  const [mapAnswerFeedback, setMapAnswerFeedback] = useState<string>("")
  const [tapBoost, setTapBoost] = useState(0)
  const [buttonWarning, setButtonWarning] = useState<string | null>(null)
  const [driftWarning, setDriftWarning] = useState(false)
  const [introWarning, setIntroWarning] = useState(true)
  const [hasTappedEnergy, setHasTappedEnergy] = useState(false)

  const targetStation = WEATHER_STATIONS[currentTargetIndex] ?? null
  const mapQuiz = targetStation ? MAP_QUIZ_BY_STATION[targetStation.id] : null
  const mapForecast = targetStation ? MAP_FORECAST_BY_STATION[targetStation.id] : null
  const activeStation =
    mode === "launch"
      ? currentTargetIndex > 0
        ? WEATHER_STATIONS[currentTargetIndex - 1]
        : null
      : mode === "complete"
        ? WEATHER_STATIONS[WEATHER_STATIONS.length - 1]
        : targetStation

  useEffect(() => {
    if (mode !== "lesson") {
      return
    }

    // Versnel de les voortgang (snellere animatie)
    const timer = window.setInterval(() => {
      setLessonProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer)
          setMode("quiz")
          return 100
        }
        // Elke 80ms +5 (ipv 1 per 200ms)
        return Math.min(current + 5, 100)
      })
    }, 80)

    return () => window.clearInterval(timer)
  }, [mode])

  useEffect(() => {
    if (tapBoost <= 0) {
      return
    }

    // Versnel tapBoost decay
    const timer = window.setTimeout(() => {
      setTapBoost((current) => Math.max(0, current - 16))
    }, 60)

    return () => window.clearTimeout(timer)
  }, [tapBoost])

  // Reset the idle timer and clear drift warning every time mode changes.
  useEffect(() => {
    lastTapRef.current = Date.now()
    setDriftWarning(false)
  }, [mode])

  // Flappy-style gravity: if no tap for IDLE_THRESHOLD ms, drift rocket back.
  // setDriftWarning is a stable setter — no stale closure risk.
  useEffect(() => {
    if (mode !== "launch") return

    const IDLE_THRESHOLD = 400 // sneller terugdriften
    const DRIFT_STEP = 4 // grotere stap
    const TICK = 70 // snellere check

    const timer = window.setInterval(() => {
      if (Date.now() - lastTapRef.current > IDLE_THRESHOLD) {
        setRocketAngle((current) => Math.min(current + DRIFT_STEP, ROCKET_START_ANGLE))
        setTapBoost(0)
        setDriftWarning(hasTappedEnergy)
      } else {
        setDriftWarning(false)
      }
    }, TICK)

    return () => window.clearInterval(timer)
  }, [hasTappedEnergy, mode])

  useEffect(() => {
    if (mode !== "lesson") {
      return
    }

    let animationFrame = 0

    // Nudge viewport upward on station arrival so the quiz area is visible sooner.
    const timer = window.setTimeout(() => {
      const startY = window.scrollY
      const targetY = Math.max(0, startY - 180)
      const distance = targetY - startY
      const duration = 620
      const startTime = performance.now()

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const step = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(progress)

        window.scrollTo(0, startY + distance * eased)

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step)
        }
      }

      animationFrame = window.requestAnimationFrame(step)
    }, 120)

    return () => {
      window.clearTimeout(timer)
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [mode])

  useEffect(() => {
    if (mode !== "mapQuiz") {
      return
    }

    let animationFrame = 0

    // Wait for map quiz panel render, then run a custom ease-in-out scroll.
    const timer = window.setTimeout(() => {
      const element = weatherMapRef.current
      if (!element) {
        return
      }

      const startY = window.scrollY
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const centerOffset = window.innerHeight / 2 - element.clientHeight / 2
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const targetY = Math.max(0, Math.min(maxScroll, elementTop - centerOffset))

      const distance = targetY - startY
      const duration = 700
      const startTime = performance.now()

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const step = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(progress)

        window.scrollTo(0, startY + distance * eased)

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step)
        }
      }

      animationFrame = window.requestAnimationFrame(step)
    }, 120)

    return () => {
      window.clearTimeout(timer)
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [mode])

  useEffect(() => {
    if (mode !== "launch" || currentTargetIndex !== 0) {
      setIntroWarning(false)
      return
    }

    setIntroWarning(true)
    const timer = window.setTimeout(() => setIntroWarning(false), 6000)

    return () => window.clearTimeout(timer)
  }, [mode, currentTargetIndex])

  function showButtonWarning(message: string, duration = 2000) {
    setButtonWarning(message)
    window.setTimeout(() => setButtonWarning(null), duration)
  }

  function handleLaunchTap() {
    if (mode === "lesson") {
      showButtonWarning("⚠️ Wacht tot de les klaar is")
      return
    }

    if (mode === "quiz") {
      showButtonWarning("⚠️ Beantwoord eerst de quiz")
      return
    }

    if (mode === "mapQuiz") {
      showButtonWarning("⚠️ Beantwoord eerst de kaartvraag")
      return
    }

    if (mode !== "launch" || !targetStation) {
      return
    }

    lastTapRef.current = Date.now()
    setHasTappedEnergy(true)
    setButtonWarning(null)
    setDriftWarning(false)
    setIntroWarning(false)
    setTapBoost((current) => Math.min(100, current + 18))
    const nextAngle = rocketAngle - TAP_STEP

    if (nextAngle <= targetStation.angle) {
      setRocketAngle(targetStation.angle)
      setLessonProgress(0)
      setSelectedAnswer(null)
      setAnswerFeedback("")
      setSelectedMapAnswer(null)
      setMapAnswerFeedback("")
      setMode("lesson")
      return
    }

    setRocketAngle(nextAngle)
  }

  function handleAnswer(option: string) {
    if (!targetStation || mode !== "quiz") {
      return
    }

    setSelectedAnswer(option)

    if (option === targetStation.answer) {
      setAnswerFeedback("Goed gedaan! Open nu de weerkaart en beantwoord de kaartvraag.")
      setSelectedMapAnswer(null)
      setMapAnswerFeedback("Goed gedaan! Nu nog 1 kaartvraag.")
      setMode("mapQuiz")
      return
    }

    setAnswerFeedback("Probeer opnieuw. Denk terug aan de les.")
  }

  function handleMapAnswer(option: string) {
    if (!targetStation || !mapQuiz || mode !== "mapQuiz") {
      return
    }

    setSelectedMapAnswer(option)

    if (option === mapQuiz.answer) {
      if (currentTargetIndex === WEATHER_STATIONS.length - 1) {
        setMode("complete")
        setCurrentTargetIndex(WEATHER_STATIONS.length)
        return
      }

      setMode("launch")
      setCurrentTargetIndex((current) => current + 1)
      setSelectedAnswer(null)
      setAnswerFeedback("")
      setSelectedMapAnswer(null)
      setMapAnswerFeedback("")
      return
    }

    setMapAnswerFeedback("Nog niet juist. Kijk nog eens goed naar de kaart.")
  }

  const themeStation = activeStation
  const rocketPosition = orbitPosition(rocketAngle, 265)
  const completedStations = mode === "complete" ? WEATHER_STATIONS.length : currentTargetIndex
  const progressPercent = (completedStations / WEATHER_STATIONS.length) * 100
  const mapCityPositionClasses: Record<string, string> = {
    Antwerpen: "left-[22%] top-[40%]",
    Gent: "left-[18%] top-[62%]",
    Brussel: "left-[40%] top-[70%]",
    Hasselt: "left-[58%] top-[54%]",
  }

  return (
    <main
      className={`${kidsFont.className} relative min-h-screen overflow-hidden bg-gradient-to-br ${themeStation?.skyClass ?? "from-[#dff5ff] via-[#edf9ff] to-[#fff4d7]"} text-[#102331] transition-colors duration-700 select-none`}
    >
      <WeatherBackdrop stationId={themeStation?.id ?? null} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34),transparent_48%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-10 pt-24 md:px-8 lg:px-10">
        <div className="flex flex-1 flex-row items-start gap-10 overflow-hidden">
          <LayoutGroup>
          <motion.section
            layout
            transition={{ layout: { type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.55 } }}
            className="relative flex min-h-[720px] flex-1 items-center justify-center rounded-[38px] border border-white/35 bg-white/12 p-4 pb-16 pt-0 shadow-[0_24px_80px_rgba(15,41,61,0.12)] backdrop-blur-xl md:p-8 md:pb-20 md:pt-0">

            <AnimatePresence>
              {introWarning && (
                <motion.div
                  key="intro-warning"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  data-control="true"
                  className="absolute left-16 top-1/2 z-20 -translate-y-1/2 max-w-[240px] rounded-2xl bg-sky-500 px-5 py-3 text-base font-bold leading-snug text-white shadow-xl"
                >
                  Geef je raket energie door op de rode knop te duwen
                </motion.div>
              )}
              {driftWarning && (
                <motion.div
                  key="drift-warning"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  data-control="true"
                  className="absolute left-16 top-1/2 z-20 -translate-y-1/2 max-w-[220px] rounded-2xl bg-red-500 px-5 py-3 text-base font-bold leading-snug text-white shadow-xl"
                >
                  Je raket gaat terug! Druk snel op de energieknop!
                </motion.div>
              )}
              {buttonWarning && (
                <motion.div
                  key="quiz-warning"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  data-control="true"
                  className="absolute left-16 top-1/2 z-20 -translate-y-1/2 max-w-[220px] rounded-2xl bg-amber-400 px-5 py-3 text-base font-bold leading-snug text-amber-900 shadow-xl"
                >
                  {buttonWarning}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" data-control="true">
              <button
                type="button"
                data-control="true"
                aria-label="Raket vooruit"
                onPointerDown={handleLaunchTap}
                className="h-20 w-20 rounded-full border-4 border-red-400/40 bg-red-600 shadow-[0_8px_0_#991b1b,0_12px_24px_rgba(185,28,28,0.45)] transition-all hover:bg-red-500 active:translate-y-2 active:shadow-[0_2px_0_#991b1b,0_4px_8px_rgba(185,28,28,0.3)] touch-manipulation select-none"
                style={{ fontFamily: "inherit" }}
              />
              <p className="whitespace-nowrap text-sm font-semibold text-[#163040]">
                  Geef je raket energie door op de rode knop te duwen
              </p>
            </div>

            <div className="relative h-[780px] w-full max-w-[640px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 640" aria-hidden="true">
                <circle cx="320" cy="320" r="265" fill="none" stroke="rgba(60,60,60,0.75)" strokeDasharray="2 12" strokeWidth="6" />
                <circle cx="320" cy="320" r="185" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
              </svg>

              <div className="pointer-events-none absolute left-1/2 top-[46%] h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 select-none rounded-full border border-white/50 shadow-[0_0_0_16px_rgba(255,255,255,0.18),0_28px_56px_rgba(8,34,96,0.35)] overflow-hidden">
                <div className="globe-float h-full w-full">
                  <img
                    src="/wereldbol.png"
                    alt="Wereldbol"
                    draggable={false}
                    className="h-full w-full select-none object-cover"
                  />
                </div>
              </div>

              {WEATHER_STATIONS.map((station, index) => {
                const position = orbitPosition(station.angle, 185)
                const isCurrent = targetStation?.id === station.id && mode !== "launch"
                const isCompleted = currentTargetIndex > index || mode === "complete"

                return (
                  <div
                    key={station.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={position}
                  >
                    <div
                      className="orb-float"
                      style={{
                        animationDelay: `${index * 0.22}s`,
                        animationDuration: `${4.4 + (index % 3) * 0.35}s`,
                      }}
                    >
                      <div
                      className={`flex h-24 w-24 flex-col items-center justify-center rounded-full border text-center shadow-[0_16px_32px_rgba(19,49,68,0.16)] transition-all duration-300 ${
                        isCurrent
                          ? `current-stop-glow scale-110 border-white/85 bg-gradient-to-br ${station.ringClass} text-white`
                          : isCompleted
                            ? `border-white/70 bg-gradient-to-br ${station.ringClass} text-white`
                            : "border-white/55 bg-white/60 text-[#13395a] backdrop-blur-md"
                      }`}
                    >
                      <span className={`text-2xl ${isCurrent ? "current-stop-text-glow" : ""}`}>{station.icon}</span>
                      <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${isCurrent ? "current-stop-text-glow" : ""}`}>
                        {station.label}
                      </span>
                    </div>
                    </div>
                  </div>
                )
              })}

              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
                style={rocketPosition}
              >
                <div
                  className="flex h-24 w-24 items-center justify-center text-5xl transition-all duration-150"
                  style={{
                    transform: `rotate(${rocketAngle - 90 - 35}deg) scale(${1 + tapBoost * 0.0035})`,
                    filter: tapBoost > 10
                      ? `drop-shadow(0 0 ${8 + tapBoost * 0.18}px rgba(255,180,0,${0.5 + tapBoost * 0.005})) drop-shadow(0 0 ${4 + tapBoost * 0.1}px rgba(255,120,0,0.7))`
                      : "none",
                    willChange: "transform, filter",
                  }}
                >
                  🚀
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 w-[530px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/25" />
            </div>
          </motion.section>

          <AnimatePresence mode="popLayout">
          {(mode === "quiz" || mode === "lesson" || mode === "mapQuiz" || mode === "complete") && (
          <motion.section
            key="right-panel"
            data-control="true"
            initial={{ opacity: 0, x: 60, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "42%" }}
            exit={{ opacity: 0, x: 60, width: 0 }}
            transition={{
              width: { type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.55 },
              x: { type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.55 },
              opacity: { type: "tween", ease: "easeInOut", duration: 0.3, delay: 0.1 },
            }}
            className="flex flex-col gap-5 overflow-hidden shrink-0">
            <div ref={weatherMapRef} className="relative order-2 overflow-hidden rounded-[32px] border border-white/45 bg-white/26 p-6 shadow-[0_24px_80px_rgba(16,35,49,0.16)] backdrop-blur-xl">
              {mode !== "mapQuiz" && mode !== "complete" && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-5xl drop-shadow-lg">🔒</span>
                </div>
              )}

              <div className={mode !== "mapQuiz" && mode !== "complete" ? "pointer-events-none blur-sm brightness-75" : ""}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#274b61]">Live weerkaart</p>
                  <h1 className="mt-3 text-3xl leading-none text-[#102331] md:text-4xl" style={{ fontFamily: "Syne, sans-serif" }}>
                    Nederland
                  </h1>
                </div>
                <div className="rounded-full bg-[#102331] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {mode === "lesson" && "Leren"}
                  {mode === "quiz" && "Quiz"}
                  {mode === "mapQuiz" && "Kaartquiz"}
                  {mode === "complete" && "Klaar"}
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/40 bg-white/45 p-4">
                <div className="relative h-[220px] overflow-hidden rounded-[18px] border border-[#8fb89d] bg-gradient-to-br from-[#dff6df] via-[#d2efdf] to-[#c8e7ff]">
                  <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:28px_28px]" />
                  <div className="absolute left-[8%] top-[18%] h-20 w-28 rounded-full bg-[#8ecf92]/30 blur-2xl" />
                  <div className="absolute right-[12%] top-[22%] h-16 w-24 rounded-full bg-[#7fc486]/28 blur-2xl" />

                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                    <path
                      d="M18 82 L24 72 L26 62 L23 54 L27 45 L36 36 L45 31 L57 29 L67 33 L73 40 L75 49 L73 58 L68 68 L60 75 L49 79 L38 82 L28 84 Z"
                      fill="rgba(118,191,94,0.9)"
                      stroke="rgba(56,112,58,0.45)"
                      strokeWidth="0.8"
                    />
                    <path d="M1 88 L5 76 L14 72 L24 75 L26 86 L19 95 L8 97 Z" fill="rgba(118,191,94,0.88)" stroke="rgba(56,112,58,0.42)" strokeWidth="0.7" />
                    <path d="M74 84 L80 73 L90 71 L99 76 L100 89 L92 97 L80 98 L75 93 Z" fill="rgba(118,191,94,0.86)" stroke="rgba(56,112,58,0.42)" strokeWidth="0.7" />
                    <path d="M56 94 L63 86 L73 85 L82 90 L81 100 L60 100 Z" fill="rgba(118,191,94,0.84)" stroke="rgba(56,112,58,0.4)" strokeWidth="0.7" />
                  </svg>

                  <div className="absolute left-0 top-0 h-8 w-[52%] bg-[#48addb]" />
                  <p className="absolute left-[6%] top-[6px] text-lg font-bold text-white">Weerkaart</p>

                  <div className="absolute right-2 top-2 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm" style={{ backgroundColor: targetStation?.accent ?? "#274b61" }}>
                    Focus: {targetStation?.icon ?? "🌤️"} {targetStation?.label ?? "Weer"}
                  </div>

                  {(mapForecast ?? []).map((item) => (
                    <div
                      key={item.city}
                      className={`absolute ${mapCityPositionClasses[item.city] ?? "left-[20%] top-[50%]"} rounded-lg bg-white/92 px-2 py-1 text-xs font-bold text-[#0f3852] shadow-sm`}
                    >
                      {item.label}
                    </div>
                  ))}

                  <div className="absolute bottom-2 right-2 rounded-md bg-[#0f3d59]/88 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Duidelijke weergave
                  </div>
                </div>
              </div>

              {mode === "mapQuiz" && targetStation && mapQuiz && (
                <div className="mt-4 rounded-[20px] border border-[#24485c]/20 bg-white/65 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2c5268]">Kaartvraag</p>
                  <p className="mt-2 text-base font-semibold text-[#163040]" style={{ fontFamily: "Syne, sans-serif" }}>
                    {mapQuiz.question}
                  </p>
                  <p className="mt-2 text-xs text-[#2b4d63]">Hint: {mapQuiz.mapHint}</p>

                  <div className="mt-3 grid gap-2">
                    {mapQuiz.options.map((option) => {
                      const isSelected = selectedMapAnswer === option
                      const isCorrect = option === mapQuiz.answer

                      return (
                        <button
                          key={option}
                          type="button"
                          data-control="true"
                          onClick={() => handleMapAnswer(option)}
                          className={`rounded-[14px] border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                            isSelected && isCorrect
                              ? "border-emerald-400 bg-emerald-500/15 text-[#174431]"
                              : isSelected
                                ? "border-rose-400 bg-rose-500/10 text-[#5a2430]"
                                : "border-[#274b61]/20 bg-white/80 text-[#173749] hover:bg-white"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>

                  {mapAnswerFeedback ? <p className="mt-3 text-sm font-medium text-[#1b3f53]">{mapAnswerFeedback}</p> : null}
                </div>
              )}


              </div>
            </div>

            <div className="order-1 rounded-[32px] border border-white/45 bg-[#0f2232]/88 p-6 text-white shadow-[0_24px_80px_rgba(10,25,38,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Lesmodule</p>
                  <h2 className="mt-2 text-2xl text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                    {targetStation?.lessonTitle ?? "Alle stations voltooid"}
                  </h2>
                </div>
                <div className="rounded-full border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  {mode === "lesson" ? `${lessonProgress}%` : mode === "quiz" ? "Quiz" : mode === "complete" ? "Klaar" : "Klaar om te starten"}
                </div>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-[28px] border border-white/15 bg-black/30">
                {lessonProgress >= 100 && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl drop-shadow-lg">🔒</span>
                    </div>
                  </div>
                )}
                <div className={`relative min-h-[220px] bg-gradient-to-br ${targetStation?.ringClass ?? "from-slate-400 to-slate-700"} p-5 transition-all duration-700 ${lessonProgress >= 100 ? "blur-sm brightness-75" : ""}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_45%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">Prototype speler</p>
                        <p className="mt-3 max-w-md text-lg leading-7 text-white/95">
                          {targetStation?.lessonText ?? "Alle weerlessen zijn voltooid."}
                        </p>
                      </div>
                      <div className="text-5xl">{targetStation?.icon ?? "🏁"}</div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/75">
                        <span>{mode === "lesson" ? `Nog ${Math.ceil((100 - lessonProgress) / 100 * 20)}s` : mode === "quiz" ? "Les afgerond" : mode === "mapQuiz" ? "Kaartvraag actief" : mode === "complete" ? "Avontuur voltooid" : "Wacht op lancering"}</span>
                        <span>{targetStation?.label ?? "Voltooid"}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/25">
                        <div
                          className="h-full rounded-full bg-white transition-all duration-200"
                          style={{ width: `${mode === "lesson" ? lessonProgress : mode === "quiz" || mode === "mapQuiz" || mode === "complete" ? 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[28px] bg-white/8 p-5">
                {mode === "quiz" && targetStation && (
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/60">Quizvraag</p>
                    <p className="mt-3 text-xl text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                      {targetStation.question}
                    </p>
                    <div className="mt-4 grid gap-3">
                      {targetStation.options.map((option) => {
                        const isSelected = selectedAnswer === option
                        const isCorrect = option === targetStation.answer

                        return (
                          <button
                            key={option}
                            type="button"
                            data-control="true"
                            onClick={() => handleAnswer(option)}
                            className={`rounded-[20px] border px-4 py-3 text-left text-sm font-medium transition-colors !text-white ${
                              isSelected && isCorrect
                                ? "border-emerald-300 bg-emerald-500/25"
                                : isSelected
                                  ? "border-rose-300 bg-rose-500/20"
                                  : "border-white/20 bg-white/8 hover:bg-white/14"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                    {answerFeedback ? <p className="mt-4 text-sm text-white/80">{answerFeedback}</p> : null}
                  </div>
                )}

                {mode === "mapQuiz" && targetStation && (
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/60">Kaartstap</p>
                    <p className="mt-3 text-base leading-7 text-white/85">
                      De weerkaart is nu ontgrendeld voor {targetStation.icon} {targetStation.label}. Beantwoord de kaartvraag rechts om verder te gaan met de raket.
                    </p>
                  </div>
                )}

                {mode === "complete" && (
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-white/60">Missie geslaagd</p>
                    <p className="mt-3 text-2xl text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                      Elk weerstation is onderzocht.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/82">
                      Het kind heeft alle zes weerlessen doorlopen en zowel de quizvraag als de kaartvraag per station correct beantwoord. Dit prototype is klaar voor echte video's en een inhoudsbackend.
                    </p>
                    <button
                      type="button"
                      data-control="true"
                      onClick={() => {
                        setMode("launch")
                        setRocketAngle(ROCKET_START_ANGLE)
                        setCurrentTargetIndex(0)
                        setLessonProgress(0)
                        setSelectedAnswer(null)
                        setAnswerFeedback("")
                        setSelectedMapAnswer(null)
                        setMapAnswerFeedback("")
                        setTapBoost(0)
                        setButtonWarning(null)
                      }}
                      className="mt-5 rounded-[20px] border border-white/30 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25 !text-white"
                    >
                      🔄 Opnieuw spelen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
          )}
          </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>

      <style jsx>{`
        @keyframes rainFall {
          0% {
            transform: translate3d(0, -10vh, 0);
          }
          100% {
            transform: translate3d(-18px, 120vh, 0);
          }
        }

        @keyframes snowFloat {
          0% {
            transform: translate3d(0, -8vh, 0);
          }
          50% {
            transform: translate3d(18px, 45vh, 0);
          }
          100% {
            transform: translate3d(-12px, 110vh, 0);
          }
        }

        @keyframes windSweep {
          0% {
            transform: translateX(-120px);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateX(280px);
            opacity: 0;
          }
        }

        @keyframes lightningFlash {
          0%, 100% {
            opacity: 0.3;
          }
          12% {
            opacity: 1;
          }
          18% {
            opacity: 0.35;
          }
          24% {
            opacity: 0.95;
          }
          30% {
            opacity: 0.2;
          }
        }

        @keyframes globeFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-7px) scale(1.01);
          }
        }

        @keyframes orbFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .globe-float {
          animation: globeFloat 5.6s ease-in-out infinite;
          will-change: transform;
        }

        .orb-float {
          animation: orbFloat 4.8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes currentStopGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.34), 0 0 20px rgba(255, 225, 120, 0.55), 0 16px 32px rgba(19, 49, 68, 0.2);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2), 0 0 32px rgba(255, 235, 150, 0.78), 0 20px 38px rgba(19, 49, 68, 0.28);
          }
        }

        .current-stop-glow {
          animation: currentStopGlow 1.8s ease-in-out infinite;
        }

        .current-stop-text-glow {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.78), 0 0 14px rgba(255, 228, 120, 0.74);
        }
      `}</style>
    </main>
  )
}