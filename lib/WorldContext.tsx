'use client'

import { createContext, useContext, useMemo, useState } from 'react'

type World = 'architect' | 'wanderer'

type WorldContextValue = {
  world: World
  setWorld: (world: World) => void
}

const WorldContext = createContext<WorldContextValue | undefined>(undefined)

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorld] = useState<World>('architect')
  const value = useMemo(() => ({ world, setWorld }), [world])
  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
}

export function useWorld() {
  const ctx = useContext(WorldContext)
  if (!ctx) throw new Error('useWorld must be used inside WorldProvider')
  return ctx
}
