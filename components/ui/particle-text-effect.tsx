"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

const W = 1200
const H = 400

const PALETTE = [
  { r: 125, g: 211, b: 252 },
  { r: 168, g: 136, b: 255 },
  { r: 200, g: 200, b: 220 },
  { r: 100, g: 180, b: 255 },
  { r: 180, g: 160, b: 255 },
]

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  isKilled = false
  shimmerPhase = Math.random() * Math.PI * 2
  shimmerSpeed = 0.02 + Math.random() * 0.03

  startColor = { r: 3, g: 6, b: 8 }
  targetColor = { r: 3, g: 6, b: 8 }
  colorWeight = 0
  colorBlendRate = 0.012

  move() {
    let proximityMult = 1
    const dx = this.pos.x - this.target.x
    const dy = this.pos.y - this.target.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const toX = this.target.x - this.pos.x
    const toY = this.target.y - this.pos.y
    const mag = Math.sqrt(toX * toX + toY * toY)

    let desiredX = 0, desiredY = 0
    if (mag > 0) {
      desiredX = (toX / mag) * this.maxSpeed * proximityMult
      desiredY = (toY / mag) * this.maxSpeed * proximityMult
    }

    let steerX = desiredX - this.vel.x
    let steerY = desiredY - this.vel.y
    const steerMag = Math.sqrt(steerX * steerX + steerY * steerY)
    if (steerMag > 0) {
      steerX = (steerX / steerMag) * this.maxForce
      steerY = (steerY / steerMag) * this.maxForce
    }

    this.acc.x += steerX
    this.acc.y += steerY
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0

    this.shimmerPhase += this.shimmerSpeed
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)

    const shimmer = 0.6 + 0.4 * Math.sin(this.shimmerPhase)
    const settled = !this.isKilled && Math.abs(this.vel.x) < 0.3 && Math.abs(this.vel.y) < 0.3

    ctx.save()
    if (settled) {
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.5 * shimmer})`
      ctx.shadowBlur = 6
    }

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${settled ? shimmer * 0.9 + 0.1 : 0.85})`
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 1.8, 0, Math.PI * 2)
    ctx.fill()

    ctx.shadowBlur = 0
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(settled ? 0.15 * shimmer : 0.1)})`
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 4.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  kill() {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const dist = 400 + Math.random() * 400
      this.target.x = W / 2 + Math.cos(angle) * dist
      this.target.y = H / 2 + Math.sin(angle) * dist

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 3, g: 6, b: 8 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
}

interface ParticleTextEffectProps {
  words?: string[]
}

const DEFAULT_WORDS = ["ARZ", "ARCHITECT", "WANDERER", "CREATE", "EXPLORE"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false })

  const pixelSteps = 4

  const nextWord = (word: string) => {
    const offscreen = document.createElement("canvas")
    offscreen.width = W
    offscreen.height = H
    const offCtx = offscreen.getContext("2d")!

    offCtx.fillStyle = "white"
    offCtx.font = "bold 96px 'Space Mono', 'SF Mono', monospace"
    offCtx.textAlign = "center"
    offCtx.textBaseline = "middle"
    offCtx.fillText(word, W / 2, H / 2)

    const imageData = offCtx.getImageData(0, 0, W, H)
    const pixels = imageData.data

    const base = PALETTE[Math.floor(Math.random() * PALETTE.length)]
    const newColor = {
      r: Math.min(255, base.r + Math.floor(Math.random() * 30 - 15)),
      g: Math.min(255, base.g + Math.floor(Math.random() * 30 - 15)),
      b: Math.min(255, base.b + Math.floor(Math.random() * 30 - 15)),
    }

    const particles = particlesRef.current
    let particleIndex = 0

    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i)
    }

    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const alpha = pixels[coordIndex + 3]
      if (alpha > 0) {
        const x = (coordIndex / 4) % W
        const y = Math.floor(coordIndex / 4 / W)

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()
          const angle = Math.random() * Math.PI * 2
          const dist = 300 + Math.random() * 400
          particle.pos.x = W / 2 + Math.cos(angle) * dist
          particle.pos.y = H / 2 + Math.sin(angle) * dist
          particle.maxSpeed = Math.random() * 7 + 5
          particle.maxForce = particle.maxSpeed * 0.05
          particle.colorBlendRate = Math.random() * 0.025 + 0.005
          particles.push(particle)
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = newColor
        particle.colorWeight = 0
        particle.target.x = x
        particle.target.y = y
      }
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill()
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    ctx.clearRect(0, 0, W, H)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx)

      if (particle.isKilled) {
        if (particle.pos.x < -50 || particle.pos.x > W + 50 || particle.pos.y < -50 || particle.pos.y > H + 50) {
          particles.splice(i, 1)
        }
      }
    }

    if (mouseRef.current.isPressed) {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      for (const particle of particles) {
        const dx = particle.pos.x - mx
        const dy = particle.pos.y - my
        if (dx * dx + dy * dy < 3600) {
          particle.kill()
        }
      }
    }

    frameCountRef.current++
    if (frameCountRef.current % 160 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      nextWord(words[wordIndexRef.current])
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext("2d")!
    ctx.scale(dpr, dpr)

    nextWord(words[0])
    animate()

    const getCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (clientX - rect.left) * (W / rect.width),
        y: (clientY - rect.top) * (H / rect.height),
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isPressed = true
      const c = getCoords(e.clientX, e.clientY)
      mouseRef.current.x = c.x
      mouseRef.current.y = c.y
    }
    const onMouseUp = () => { mouseRef.current.isPressed = false }
    const onMouseMove = (e: MouseEvent) => {
      const c = getCoords(e.clientX, e.clientY)
      mouseRef.current.x = c.x
      mouseRef.current.y = c.y
    }
    const onTouchStart = (e: TouchEvent) => {
      mouseRef.current.isPressed = true
      const c = getCoords(e.touches[0].clientX, e.touches[0].clientY)
      mouseRef.current.x = c.x
      mouseRef.current.y = c.y
    }
    const onTouchMove = (e: TouchEvent) => {
      const c = getCoords(e.touches[0].clientX, e.touches[0].clientY)
      mouseRef.current.x = c.x
      mouseRef.current.y = c.y
    }
    const onTouchEnd = () => { mouseRef.current.isPressed = false }
    const onCtx = (e: MouseEvent) => { e.preventDefault() }

    canvas.addEventListener("mousedown", onMouseDown)
    canvas.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("touchstart", onTouchStart, { passive: true })
    canvas.addEventListener("touchmove", onTouchMove, { passive: true })
    canvas.addEventListener("touchend", onTouchEnd)
    canvas.addEventListener("contextmenu", onCtx)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener("mousedown", onMouseDown)
      canvas.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchend", onTouchEnd)
      canvas.removeEventListener("contextmenu", onCtx)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  )
}
