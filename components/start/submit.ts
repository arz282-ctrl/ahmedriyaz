import { PERSON } from '@/lib/site'

export type Intake = {
  type: string
  typeLabel: string
  budget: string
  timeline: string
  brief: string
  links: string
  name: string
}

/** Hard cap on the free-text brief. Keeps the encoded mailto: body under the
 *  ~1800-character ceiling where email clients start truncating — by
 *  construction rather than by hope. */
export const BRIEF_MAX = 700

/** One plain-text summary, shared by every channel so nothing can drift. */
export const composeBrief = (i: Intake) => {
  const lines = [
    'PROJECT INTAKE — arz4dev.vercel.app',
    '',
    `Type:      ${i.typeLabel || '—'}`,
    `Budget:    ${i.budget || '—'}`,
    `Timeline:  ${i.timeline || '—'}`,
  ]
  if (i.name.trim()) lines.push(`From:      ${i.name.trim()}`)
  lines.push('', 'Brief:', i.brief.trim() || '—')
  if (i.links.trim()) lines.push('', 'Links:', i.links.trim())
  return lines.join('\n')
}

export const mailtoHref = (i: Intake) =>
  `mailto:${PERSON.email}?subject=${encodeURIComponent(
    `Project intake — ${i.typeLabel || 'New project'}`,
  )}&body=${encodeURIComponent(composeBrief(i))}`

export const whatsappHref = (i: Intake) =>
  `${PERSON.whatsapp}?text=${encodeURIComponent(composeBrief(i))}`

export const BUDGETS = ['Under $1k', '$1k — $5k', '$5k — $15k', '$15k+', 'Not sure yet'] as const
export const TIMELINES = ['ASAP', '2 — 4 weeks', '1 — 3 months', 'Just exploring'] as const
