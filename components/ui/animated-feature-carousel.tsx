"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  useRef,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "framer-motion"

// --- Helper ---
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ")

// --- Types ---
type StaticImageData = string

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

export interface CarouselStep {
  id: string
  name: string
  title: string
  description: string
  image: StaticImageData
}

export interface ProjectCarouselProps {
  steps: CarouselStep[]
  projectTitle: string
  projectLink: string
  tags: string[]
  status: string
  interval?: number
}

interface StepImageProps {
  src: StaticImageData
  alt: string
  className?: string
  style?: React.CSSProperties
}

// --- Diagonal slide presets (alternating based on direction) ---
function getDiagonalVariant(direction: 'next' | 'prev') {
  const variants = [
    // Slide from top-right
    {
      initial: { opacity: 0, x: 40, y: -30, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x: -40, y: 30, scale: 0.95 },
    },
    // Slide from bottom-left
    {
      initial: { opacity: 0, x: -40, y: 30, scale: 0.95 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x: 40, y: -30, scale: 0.95 },
    },
    // Slide from right
    {
      initial: { opacity: 0, x: 50, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -50, scale: 0.95 },
    },
  ]
  return direction === 'next' ? variants[0] : variants[1]
}

// --- Hooks ---
function useNumberCycler(totalSteps: number, interval: number = 5000) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDirection('next')
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
    }, interval)
    return () => clearTimeout(timerId)
  }, [currentNumber, totalSteps, interval])

  const setStep = useCallback(
    (stepIndex: number) => {
      setDirection(stepIndex > currentNumber ? 'next' : 'prev')
      setCurrentNumber(stepIndex % totalSteps)
    },
    [currentNumber, totalSteps]
  )

  return { currentNumber, direction, setStep }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

// --- Typewriter hook ---
function useTypewriter(text: string, speed = 35, trigger = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) {
      setDisplayed('')
      setDone(false)
      return
    }
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, trigger])

  return { displayed, done }
}

// --- Sub-components ---
function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn("h-4 w-4", className)} {...props}>
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants = {
  inactive: { scale: 0.95, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
}

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={className}
      src={src}
      style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
      {...props}
    />
  )
)
StepImage.displayName = "StepImage"

const MotionStepImage = motion.create(StepImage)

function AnimatedStepImage({
  direction,
  ...props
}: StepImageProps & { direction: 'next' | 'prev' }) {
  const config = getDiagonalVariant(direction)
  return (
    <MotionStepImage
      {...props}
      {...config}
      transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.5 }}
    />
  )
}

/* ── Feature card with glow tracking + diagonal slide ── */
function FeatureCard({
  children,
  step,
  steps,
  direction,
}: {
  children: React.ReactNode
  step: number
  steps: CarouselStep[]
  direction: 'next' | 'prev'
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()
  const [showGlitch, setShowGlitch] = useState(false)
  const prevStep = useRef(step)

  // Glitch effect on step change
  useEffect(() => {
    if (prevStep.current !== step) {
      setShowGlitch(true)
      const t = setTimeout(() => setShowGlitch(false), 300)
      prevStep.current = step
      return () => clearTimeout(t)
    }
  }, [step])

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const cfg = getDiagonalVariant(direction)

  return (
    <motion.div
      className="animated-cards group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition-colors duration-300 hover:border-[rgba(74,222,128,0.20)]">
        {/* Glitch overlay on transition */}
        <AnimatePresence>
          {showGlitch && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-30 bg-[rgba(74,222,128,0.5)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.2, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Scanline glitch lines */}
        <AnimatePresence>
          {showGlitch && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="pointer-events-none absolute left-0 z-30 h-[1px] w-full bg-[rgba(74,222,128,0.40)]"
                  initial={{ top: `${20 + i * 25}%`, opacity: 0 }}
                  animate={{ top: [`${20 + i * 25}%`, `${60 + i * 10}%`], opacity: [0, 0.8, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <div className="p-6 md:p-10 min-h-[420px] md:min-h-[480px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-3 md:w-3/5"
              initial={{ opacity: 0, x: cfg.initial.x, y: cfg.initial.y, scale: cfg.initial.scale }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: cfg.exit.x, y: cfg.exit.y, scale: cfg.exit.scale }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.5 }}
            >
              {/* Typewriter step name */}
              <TypewriterName text={steps[step].name} step={step} />

              <motion.h3
                className="font-sans text-xl font-bold tracking-tight text-[var(--silver)] md:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].title}
              </motion.h3>
              <motion.p
                className="text-sm leading-relaxed text-[rgba(224,224,224,0.50)] max-w-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.14, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Typewriter name component ── */
function TypewriterName({ text, step }: { text: string; step: number }) {
  const { displayed, done } = useTypewriter(text, 35, true)
  return (
    <motion.div
      className="font-code text-xs tracking-[0.2em] text-[#4ade80]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.03, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {displayed}
      {!done && (
        <span className="ml-0.5 inline-block h-[0.85em] w-[2px] animate-pulse-glow bg-[#4ade80] align-middle" />
      )}
    </motion.div>
  )
}

/* ── Step navigation pills ── */
function StepsNav({
  steps: stepItems,
  current,
  onChange,
}: {
  steps: CarouselStep[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
        {stepItems.map((step, idx) => {
          const isCompleted = current > idx
          const isCurrent = current === idx
          return (
            <motion.li
              key={step.id}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                type="button"
                className={cn(
                  "group flex items-center gap-2 rounded-full px-3 py-1.5 font-code text-xs tracking-wider transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)]",
                  isCurrent
                    ? "bg-[#4ade80] text-[var(--void)]"
                    : "bg-white/[0.05] text-[rgba(224,224,224,0.60)] hover:bg-white/[0.08] hover:text-[var(--silver)]"
                )}
                onClick={() => onChange(idx)}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300",
                    isCompleted
                      ? "bg-[#4ade80] text-[var(--void)]"
                      : isCurrent
                        ? "bg-[rgba(3,6,8,0.20)] text-[var(--void)]"
                        : "bg-white/[0.08] text-[rgba(224,224,224,0.50)] group-hover:bg-white/[0.12]"
                  )}
                >
                  {isCompleted ? <IconCheck className="h-3 w-3" /> : <span>{idx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block">{step.name}</span>
              </button>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ── Main exported carousel ── */
export function FeatureCarousel({
  steps,
  projectTitle,
  projectLink,
  tags,
  status,
  interval = 5000,
}: ProjectCarouselProps) {
  const { currentNumber: step, direction, setStep } = useNumberCycler(steps.length, interval)

  const imgBaseClass =
    "rounded-xl border border-white/[0.08] shadow-2xl shadow-black/40 w-[85%] md:w-[55%] right-0 md:right-4 top-[38%] md:top-[15%]"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8 w-full"
    >
      {/* Project header */}
      <div className="flex items-center gap-3 px-1">
        <h3 className="font-sans text-lg font-semibold tracking-tight md:text-xl text-[var(--silver)]">
          {projectTitle}
        </h3>
        <span className="rounded-full border border-[rgba(74,222,128,0.30)] px-2 py-0.5 font-code text-[9px] tracking-wider text-[#4ade80]">
          {status}
        </span>
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto font-code text-[10px] tracking-wider text-[rgba(224,224,224,0.30)] hover:text-[#4ade80] transition-colors"
        >
          VIEW LIVE &rarr;
        </a>
      </div>

      {/* Carousel card */}
      <FeatureCard step={step} steps={steps} direction={direction}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.5 }}
            className="w-full h-full absolute"
          >
            <AnimatedStepImage
              alt={steps[step].title}
              className={imgBaseClass}
              src={steps[step].image}
              direction={direction}
            />
          </motion.div>
        </AnimatePresence>
      </FeatureCard>

      {/* Step nav + tags */}
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StepsNav current={step} onChange={setStep} steps={steps} />
        </motion.div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 font-code text-[10px] text-[rgba(224,224,224,0.40)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}