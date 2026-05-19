'use client'

import { useEffect, useState } from 'react'

type Props = {
  text: string
  speed?: number
  className?: string
  trigger?: boolean
}

export default function TypewriterText({ text, speed = 40, className = '', trigger = true }: Props) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!trigger) {
      setDisplayed('')
      return
    }

    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, trigger])

  return (
    <span className={`${className} inline-block`}>
      {displayed}
      <span className="ml-0.5 inline-block h-[0.85em] w-[2px] animate-pulse-glow bg-[var(--neural)] align-middle" />
    </span>
  )
}
