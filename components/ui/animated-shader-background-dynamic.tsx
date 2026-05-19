'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import AnimatedShaderBackground from './animated-shader-background'

type Props = ComponentProps<typeof AnimatedShaderBackground>

/**
 * Renders nothing on SSR and on the first client paint, then mounts the
 * real WebGL shader after hydration. Avoids `next/dynamic({ ssr: false })`
 * which leaves a Suspense bailout marker in SSR HTML that React 18 reports as
 * a hydration error in dev.
 */
export default function AnimatedShaderBackgroundClientOnly(props: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return <AnimatedShaderBackground {...props} />
}
