'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import CosmicAmbient from './cosmic-ambient'

type Props = ComponentProps<typeof CosmicAmbient>

/**
 * Renders nothing on SSR and on the first client paint, then mounts the
 * real CosmicAmbient after hydration. Avoids `next/dynamic({ ssr: false })`
 * which leaves a Suspense bailout marker in SSR HTML that React 18 reports as
 * a hydration error in dev.
 */
export default function CosmicAmbientClientOnly(props: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return <CosmicAmbient {...props} />
}
