"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "INFINITE" },
    { top: "INFINITE", bottom: "PROGRESS" },
    { top: "PROGRESS", bottom: "INNOVATION" },
    { top: "INNOVATION", bottom: "FUTURE" },
    { top: "FUTURE", bottom: "DREAMS" },
    { top: "DREAMS", bottom: "ACHIEVEMENT" },
    { top: "ACHIEVEMENT", bottom: "\u00A0" },
  ],
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  const calculateTranslateX = (index: number) => {
    const baseOffset = 35
    const baseOffsetMd = 20
    const centerIndex = Math.floor(lines.length / 2)
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const paragraphs = container.querySelectorAll("p")

    const shiftY = window.innerWidth >= 768 ? 60 : 35

    timelineRef.current = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

    timelineRef.current
      .to(paragraphs, {
        y: shiftY,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
      })
      .to(paragraphs, {
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.08,
        delay: 2,
      })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timelineRef.current?.play()
        } else {
          timelineRef.current?.pause()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      timelineRef.current?.kill()
    }
  }, [lines])

  return (
    <div
      ref={containerRef}
      className={`mx-auto cursor-pointer py-24 font-sans text-black antialiased dark:text-white ${className}`}
      style={{ fontSize, "--md-font-size": fontSizeMd } as React.CSSProperties}
    >
      <ul className="m-0 flex list-none flex-col items-center p-0">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          return (
            <li
              key={index}
              className={`relative overflow-hidden ${
                index % 2 === 0
                  ? "[transform:skew(60deg,-30deg)_scaleY(0.66667)]"
                  : "[transform:skew(0deg,-30deg)_scaleY(1.33333)]"
              }`}
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                  "--md-height": `${lineHeightMd}px`,
                  "--md-translateX": `${translateX.mobile}px`,
                } as React.CSSProperties
              }
            >
              <p
                className="m-0 whitespace-nowrap px-[15px] align-top leading-[55px] md:leading-[30px]"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  } as React.CSSProperties
                }
              >
                {line.top}
              </p>
              <p
                className="m-0 whitespace-nowrap px-[15px] align-top leading-[55px] md:leading-[30px]"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  } as React.CSSProperties
                }
              >
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
