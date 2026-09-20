'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { SeededRandom } from '@/lib/hydration-utils'
import { debounce, prefersReducedMotion } from '@/lib/motion-utils'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  // Declared BEFORE the Three.js effect on purpose: effects run in declaration
  // order, so the reveal fires on the hydration commit instead of waiting for
  // ~600KB of WebGL to build 4000 stars, a nebula shader and three meshes.
  // Previously setReady(true) lived at the end of the Three.js effect, which
  // put the entire scene on the critical path for the hero text.
  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.0003)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.set(0, 30, 100)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 4) <= 4 || window.innerWidth < 900
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPowerDevice ? 1.25 : 1.6))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.5

    // Initialize seeded random for deterministic generation
    const seededRandom = new SeededRandom(12345)

    // Stars
    const starCount = lowPowerDevice ? 2000 : 4000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const r = 200 + seededRandom.next() * 600
      const theta = seededRandom.next() * Math.PI * 2
      const phi = Math.acos(seededRandom.next() * 2 - 1)
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)

      const c = new THREE.Color()
      const choice = seededRandom.next()
      if (choice < 0.6) c.setHSL(0, 0, 0.8 + seededRandom.next() * 0.2)
      else if (choice < 0.8) c.setHSL(0.48, 0.5, 0.7)
      else c.setHSL(0.6, 0.4, 0.8)
      starColors[i * 3] = c.r
      starColors[i * 3 + 1] = c.g
      starColors[i * 3 + 2] = c.b
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMaterial = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Nebula plane
    const nebulaGeo = new THREE.PlaneGeometry(4000, 2000, 60, 60)
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, color1: { value: new THREE.Color(0x003322) }, color2: { value: new THREE.Color(0x1a0044) } },
      vertexShader: `varying vec2 vUv; uniform float time; void main(){ vUv=uv; vec3 p=position; p.z+=sin(p.x*0.01+time)*cos(p.y*0.01+time)*15.0; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
      fragmentShader: `uniform vec3 color1; uniform vec3 color2; uniform float time; varying vec2 vUv; void main(){ float m=sin(vUv.x*8.0+time)*cos(vUv.y*8.0+time); vec3 c=mix(color1,color2,m*0.5+0.5); float a=0.25*(1.0-length(vUv-0.5)*2.0); gl_FragColor=vec4(c,a); }`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    })
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat)
    nebula.position.z = -500
    scene.add(nebula)

    // Mountains (reset seeded random for consistent mountain generation)
    const mountainSeededRandom = new SeededRandom(54321)
    const mountainLayers = [
      { d: -50, h: 50, color: 0x0a1a14, opacity: 1 },
      { d: -100, h: 70, color: 0x0d2a1e, opacity: 0.7 },
      { d: -150, h: 90, color: 0x103828, opacity: 0.5 },
    ]
    const mountainGeometries: THREE.ShapeGeometry[] = []
    const mountainMaterials: THREE.MeshBasicMaterial[] = []

    mountainLayers.forEach((layer) => {
      const pts: THREE.Vector2[] = []
      for (let i = 0; i <= 60; i++) {
        const x = (i / 60 - 0.5) * 1200
        const y = Math.sin(i * 0.12) * layer.h + Math.sin(i * 0.05) * layer.h * 0.4 + mountainSeededRandom.next() * layer.h * 0.15 - 80
        pts.push(new THREE.Vector2(x, y))
      }
      pts.push(new THREE.Vector2(600, -300))
      pts.push(new THREE.Vector2(-600, -300))
      const shape = new THREE.Shape(pts)
      const geo = new THREE.ShapeGeometry(shape)
      const mat = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.z = layer.d
      mesh.position.y = -30
      scene.add(mesh)
      mountainGeometries.push(geo)
      mountainMaterials.push(mat)
    })

    const reduced = prefersReducedMotion()

    // Mouse parallax (skipped when reduced motion is on)
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (!reduced) window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Animate
    let animId: number | null = null
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now() * 0.001

      stars.rotation.y = t * 0.02
      stars.rotation.x = t * 0.005
      nebulaMat.uniforms.time.value = t * 0.3

      camera.position.x += (mouseX * 15 - camera.position.x) * 0.03
      camera.position.y += (30 + mouseY * -8 - camera.position.y) * 0.03
      camera.lookAt(0, 0, -200)

      renderer.render(scene, camera)
    }
    if (reduced) {
      // Render a single static frame for reduced-motion users
      renderer.render(scene, camera)
    } else {
      animate()
    }

    const onResize = debounce(() => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (reduced) renderer.render(scene, camera)
    }, 150)
    window.addEventListener('resize', onResize)

    return () => {
      if (animId !== null) cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      onResize.cancel()
      renderer.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      nebulaGeo.dispose()
      nebulaMat.dispose()
      mountainGeometries.forEach((g) => g.dispose())
      mountainMaterials.forEach((m) => m.dispose())
    }
  }, [])

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--void)]" />

      {/* Top metadata */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : -40 }} transition={{ duration: 1, delay: 1.5 }} className="absolute left-6 top-24 font-code text-xs text-[#7dd3fc]">
        RAREWARE_STUDIO // CEO
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : 40 }} transition={{ duration: 1, delay: 1.5 }} className="absolute right-6 top-24 font-code text-xs text-[var(--system-alert)]">
        READYPI // LIVE
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 0.06 : 0 }} transition={{ duration: 2, delay: 0.5 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-logo text-[16vw] leading-none text-white select-none pointer-events-none md:text-[11vw]">
          ARZ
        </motion.div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(125,211,252,0.20)] bg-[rgba(125,211,252,0.04)] px-4 py-1.5 shadow-[0_0_20px_rgba(125,211,252,0.08)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7dd3fc] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
          </span>
          <span className="font-code text-[10px] tracking-[0.25em] text-[rgba(125,211,252,0.80)]">OPEN TO WORK</span>
        </motion.div>

        {/* Plain h1, not motion.h1: this is the LCP element, so it must render
            visible in the SSR HTML and animate transform only. */}
        <h1 className="hero-rise font-sans text-[clamp(3.5rem,11vw,9.5rem)] font-bold italic leading-[0.9] tracking-[-0.03em] text-[var(--silver)]">
          <span className="inline-block text-left">
            <span className="block text-[var(--silver)]">Ahmed</span>
            <span className="mt-[0.05em] block pl-[41%] text-[rgba(224,224,224,0.92)]">Riyaz</span>
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-10 max-w-2xl mx-auto font-code text-sm tracking-[0.18em] text-[rgba(74,222,128,0.9)]"
        >
          {'FOUNDER · PRODUCT SYSTEMS · AI-NATIVE EXECUTION'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.03, delay: 1 + i * 0.035 }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? [0, 1, 0] : 0 }}
            transition={{ duration: 0.8, delay: 1, repeat: Infinity }}
            className="ml-0.5 inline-block w-[2px] h-[1em] bg-[#7dd3fc] align-middle"
          />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-4 max-w-2xl mx-auto font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.62)]"
        >
          I design and ship high-performance digital products where strategic design, engineering discipline, and AI workflows move as one system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/start" className="group relative inline-flex items-center">
            <div className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#4ade80] via-[#a888ff] to-[#4ade80] opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-40 group-active:opacity-80 group-active:blur-[6px]" />
            <div className="relative z-10 flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0a0d12] px-6 py-3 transition-all duration-500 group-hover:border-white/[0.15] group-active:border-[rgba(74,222,128,0.4)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-all duration-700 group-hover:left-[130%]" />
              </div>
              <div className="pointer-events-none absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="font-code text-[10px] md:text-[11px] tracking-[0.25em] text-[#c8c8d2] transition-colors duration-500 group-hover:text-white group-active:text-[#4ade80]">START A PROJECT</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#4ade80] to-[#5eb8e0] shadow-[0_0_12px_rgba(74,222,128,0.25)] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] group-hover:scale-110 group-active:scale-95">
                <svg className="h-3 w-3 text-[#030608] transition-transform duration-500 group-hover:translate-x-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </Link>
          <Link href="/work" className="group rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 font-code text-[10px] md:text-[11px] tracking-[0.25em] text-[rgba(224,224,224,0.6)] transition-all duration-500 hover:border-white/[0.15] hover:text-[rgba(224,224,224,0.9)] hover:bg-white/[0.04]">
            VIEW WORK
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-code text-[10px] tracking-[0.3em] text-[rgba(224,224,224,0.3)]">SCROLL</span>
        <div className="h-12 w-px bg-gradient-to-b from-[rgba(74,222,128,0.5)] to-transparent animate-pulse-glow" />
      </motion.div>
    </section>
  )
}
