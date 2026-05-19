'use client'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  repeat?: number
  duration?: string
  gap?: string
}

export function VerticalMarquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 3,
  duration = '25s',
  gap = '1rem',
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden',
        pauseOnHover && 'marquee-col-pause',
        className,
      )}
      style={{
        '--duration': duration,
        '--gap': gap,
        gap: gap,
      } as React.CSSProperties}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn('marquee-col', reverse && 'marquee-col-reverse')}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
