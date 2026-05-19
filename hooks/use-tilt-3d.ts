'use client'

import { useCallback, useRef, useState } from 'react'

interface TiltState {
  rotateX: number
  rotateY: number
  scale: number
}

export function useTilt3D(maxRotateX = 12, maxRotateY = 14, maxScale = 1.04) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 })
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const pctX = x / rect.width - 0.5
      const pctY = y / rect.height - 0.5

      setTilt({
        rotateX: -pctY * 2 * maxRotateX,
        rotateY: pctX * 2 * maxRotateY,
        scale: maxScale,
      })
    },
    [maxRotateX, maxRotateY, maxScale]
  )

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  return { ref, tilt, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave }
}
