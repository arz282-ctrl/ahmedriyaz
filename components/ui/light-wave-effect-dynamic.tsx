'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import LightWaveEffect from './light-wave-effect'

type Props = ComponentProps<typeof LightWaveEffect>

/**
 * Renders nothing on SSR and on the first client paint, then mounts the
 * real LightWaveEffect after hydration. Avoids `next/dynamic({ ssr: false })`
 * which leaves a Suspense bailout marker in SSR HTML that React 18 reports as
 * a hydration error in dev.
 */
export default function LightWaveEffectClientOnly(props: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  return <LightWaveEffect {...props} />
}
