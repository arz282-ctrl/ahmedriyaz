'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type World = 'architect' | 'wanderer'

type WorldContextValue = {
  world: World
  setWorld: (world: World) => void
}

const WorldContext = createContext<WorldContextValue | undefined>(undefined)

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Always initialize as 'architect' to match SSR default, then sync on mount
  const [world, setWorld] = useState<World>('architect')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setWorld(pathname.startsWith('/beyond') ? 'wanderer' : 'architect')
  }, [pathname])

  const value = useMemo(() => ({ world, setWorld }), [world])
  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
}

export function useWorld() {
  const ctx = useContext(WorldContext)
  if (!ctx) throw new Error('useWorld must be used inside WorldProvider')
  return ctx
}
