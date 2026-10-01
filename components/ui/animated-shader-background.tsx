'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { debounce, prefersReducedMotion } from '@/lib/motion-utils'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

// Optimised: 2 FBM octaves, 18 light passes (down from 3 / 35), removed per-pass fbm call
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    return mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.3;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 2; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.4;
    }
    return v;
  }

  void main() {
    vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
    vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
    vec2 v;
    vec4 o = vec4(0.0);

    float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

    for (float i = 0.0; i < 18.0; i++) {
      v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5
            + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
      vec4 auroraColors = vec4(
        0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
        0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
        0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
        1.0
      );
      vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8))
        / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
      float thinnessFactor = smoothstep(0.0, 1.0, i / 18.0) * 0.6;
      o += currentContribution * thinnessFactor;
    }

    o = tanh(pow(o / 100.0, vec4(1.6)));
    gl_FragColor = o * 1.5;
  }
`

/** Resolution scale factor — 0.3 = render at 30% of screen size then CSS-upscale (blurry = fine for BG) */
const RES_SCALE = 0.3
/** Target ~24 fps for a background effect (ms between frames) */
const FRAME_INTERVAL = 1000 / 24

export interface AnimatedShaderBackgroundProps {
  className?: string
  opacity?: number
}

const AnimatedShaderBackground = ({
  className = '',
  opacity = 0.5,
}: AnimatedShaderBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })

    const width = window.innerWidth
    const height = window.innerHeight
    // Render at a fraction of actual size — CSS stretches it back to full
    renderer.setSize(Math.round(width * RES_SCALE), Math.round(height * RES_SCALE), false)
    renderer.setPixelRatio(1)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    container.appendChild(renderer.domElement)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(
            Math.round(width * RES_SCALE),
            Math.round(height * RES_SCALE)
          ),
        },
      },
      vertexShader,
      fragmentShader,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const reduced = prefersReducedMotion()

    let frameId: number | null = null
    let lastTime = 0
    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate)
      if (now - lastTime < FRAME_INTERVAL) return
      lastTime = now
      material.uniforms.iTime.value += 0.032 // slower time step for subtlety
      renderer.render(scene, camera)
    }
    // The canvas is position:fixed, so observe the section it sits in instead:
    // render only while that content is on screen (not behind the hero) and
    // the tab is visible.
    let onScreen = true
    const start = () => { if (frameId === null && onScreen && !document.hidden) frameId = requestAnimationFrame(animate) }
    const stop = () => { if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null } }
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? start() : stop() })
    const onVis = () => (document.hidden ? stop() : start())
    if (reduced) {
      // Single static frame for reduced-motion users
      renderer.render(scene, camera)
    } else {
      io.observe(container.parentElement ?? container)
      document.addEventListener('visibilitychange', onVis)
      start()
    }

    const handleResize = debounce(() => {
      const w = Math.round(window.innerWidth * RES_SCALE)
      const h = Math.round(window.innerHeight * RES_SCALE)
      renderer.setSize(w, h, false)
      material.uniforms.iResolution.value.set(w, h)
      if (reduced) renderer.render(scene, camera)
    }, 150)
    window.addEventListener('resize', handleResize)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', handleResize)
      handleResize.cancel()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}

export default AnimatedShaderBackground
