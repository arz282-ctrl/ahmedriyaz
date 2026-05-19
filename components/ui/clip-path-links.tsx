'use client'

import React from 'react'
import {
  SiVercel,
  SiNetlify,
} from 'react-icons/si'
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6'
import {
  Github,
  Linkedin,
  Globe,
} from 'lucide-react'
import { useAnimate } from 'framer-motion'

/* ── Clip-path keyframes ── */

const NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
const BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0% 100%)'
const TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0% 100%)'
const TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)'
const BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)'

const ENTRANCE_KEYFRAMES: Record<string, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
}

const EXIT_KEYFRAMES: Record<string, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
}

/* ── Link data for ARZ ── */

const socialLinks = {
  row1: [
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/rijuyan-ahmed/', label: 'LinkedIn' },
    { Icon: Github, href: 'https://github.com/arz282-ctrl/', label: 'GitHub' },
  ],
  row2: [
    { Icon: FaXTwitter, href: 'https://x.com/AhmedxRiyaz', label: 'X / Twitter' },
    { Icon: FaFacebookF, href: 'https://www.facebook.com/riyaz282/', label: 'Facebook' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/ahmed_x_riyaz/', label: 'Instagram' },
    { Icon: SiNetlify, href: 'https://app.netlify.com/teams/arz282-ctrl/projects', label: 'Netlify' },
  ],
  row3: [
    { Icon: SiVercel, href: 'https://vercel.com/arz282-ctrls-projects', label: 'Vercel' },
    { Icon: Globe, href: 'https://arz-portfolio-v4.vercel.app/', label: 'Portfolio v4' },
  ],
}

/* ── LinkBox with clip-path reveal ── */

interface LinkBoxProps {
  Icon: React.ElementType
  href: string
  label: string
}

function LinkBox({ Icon, href, label }: LinkBoxProps) {
  const [scope, animate] = useAnimate()

  const getNearestSide = (e: React.MouseEvent) => {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect()

    const sides = [
      { proximity: Math.abs(box.left - e.clientX), side: 'left' },
      { proximity: Math.abs(box.right - e.clientX), side: 'right' },
      { proximity: Math.abs(box.top - e.clientY), side: 'top' },
      { proximity: Math.abs(box.bottom - e.clientY), side: 'bottom' },
    ]

    sides.sort((a, b) => a.proximity - b.proximity)
    return sides[0].side
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const side = getNearestSide(e)
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e)
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 bg-[#141418] text-[#c8c8d2]/60 transition-colors"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
        <span className="font-code text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#c8c8d2]/80">
          {label}
        </span>
      </div>

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-white/85 text-black transition-colors duration-300"
      >
        <div className="flex flex-col items-center gap-2">
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
          <span className="font-code text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold">
            {label}
          </span>
        </div>
      </div>
    </a>
  )
}

/* ── Main component ── */

export function ClipPathLinks() {
  return (
    <div className="divide-y divide-white/[0.12] border border-white/[0.12] rounded-xl overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-white/[0.12]">
        {socialLinks.row1.map((link) => (
          <LinkBox key={link.label} {...link} />
        ))}
      </div>
      <div className="grid grid-cols-4 divide-x divide-white/[0.12]">
        {socialLinks.row2.map((link) => (
          <LinkBox key={link.label} {...link} />
        ))}
      </div>
      <div className="grid grid-cols-2 divide-x divide-white/[0.12]">
        {socialLinks.row3.map((link) => (
          <LinkBox key={link.label} {...link} />
        ))}
      </div>
    </div>
  )
}
