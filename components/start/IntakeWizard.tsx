'use client'

import { track } from '@vercel/analytics'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { services } from '@/lib/content/services'
import { PERSON } from '@/lib/site'
import {
  BRIEF_MAX,
  BUDGETS,
  TIMELINES,
  composeBrief,
  mailtoHref,
  whatsappHref,
  type Intake,
} from './submit'

const TOTAL_STEPS = 4

const chipBase =
  'rounded-full border px-4 py-2.5 font-code text-[11px] tracking-[0.14em] transition-all duration-300'
const chipOn = 'border-[rgba(74,222,128,0.6)] bg-[rgba(74,222,128,0.12)] text-[#4ade80]'
const chipOff =
  'border-[var(--card-border)] bg-[var(--card-bg)] text-[rgba(224,224,224,0.6)] hover:border-[rgba(125,211,252,0.35)] hover:text-[var(--silver)]'

export default function IntakeWizard() {
  const params = useSearchParams()
  // Deep link: /start?type=shopify preselects the chip.
  const presetType = params.get('type') ?? ''
  const validPreset = services.some((s) => s.slug === presetType) ? presetType : ''

  const [step, setStep] = useState(0)
  const [type, setType] = useState(validPreset)
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [brief, setBrief] = useState('')
  const [links, setLinks] = useState('')
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)

  const intake: Intake = useMemo(
    () => ({
      type,
      typeLabel: type === 'other' ? 'Something else' : services.find((s) => s.slug === type)?.title ?? '',
      budget,
      timeline,
      brief,
      links,
      name,
    }),
    [type, budget, timeline, brief, links, name],
  )

  const summary = composeBrief(intake)
  const canAdvance = [Boolean(type), Boolean(budget && timeline), brief.trim().length > 0, true][step]

  const go = (next: number) => setStep(Math.min(Math.max(next, 0), TOTAL_STEPS - 1))

  const onSend = (channel: 'email' | 'whatsapp') => {
    track('intake_submit', { type: type || 'unset', budget: budget || 'unset', channel })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-9">
      {/* ── Progress ── */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-code text-[11px] tracking-[0.2em] text-[rgba(125,211,252,0.75)]">
          STEP {step + 1}/{TOTAL_STEPS}
        </p>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
          aria-label="Intake progress"
          className="flex flex-1 gap-1.5"
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                i <= step ? 'bg-[#4ade80]' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Deliberately not AnimatePresence with mode="wait": that holds the
          outgoing step until its exit animation settles, and a step change
          arriving mid-transition (a fast double-click, or a tab that was
          backgrounded so rAF stalled) can leave the panel blank with no way
          back. A keyed fade-in has no exit to wait on. */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 min-h-[280px]"
        >
          {/* ── 1. Type ── */}
          {step === 0 && (
            <fieldset>
              <legend className="font-display text-2xl italic leading-none text-[var(--silver)]">
                What kind of project is it?
              </legend>
              <div className="mt-5 flex flex-wrap gap-3" role="radiogroup" aria-label="Project type">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    role="radio"
                    aria-checked={type === s.slug}
                    onClick={() => setType(s.slug)}
                    className={`${chipBase} ${type === s.slug ? chipOn : chipOff}`}
                  >
                    {s.title}
                  </button>
                ))}
                <button
                  type="button"
                  role="radio"
                  aria-checked={type === 'other'}
                  onClick={() => setType('other')}
                  className={`${chipBase} ${type === 'other' ? chipOn : chipOff}`}
                >
                  Something else
                </button>
              </div>
            </fieldset>
          )}

          {/* ── 2. Budget + timeline ── */}
          {step === 1 && (
            <div className="space-y-8">
              <fieldset>
                <legend className="font-display text-2xl italic leading-none text-[var(--silver)]">
                  What&apos;s the budget range?
                </legend>
                <div className="mt-5 flex flex-wrap gap-3" role="radiogroup" aria-label="Budget">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      role="radio"
                      aria-checked={budget === b}
                      onClick={() => setBudget(b)}
                      className={`${chipBase} ${budget === b ? chipOn : chipOff}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-2xl italic leading-none text-[var(--silver)]">And the timeline?</legend>
                <div className="mt-5 flex flex-wrap gap-3" role="radiogroup" aria-label="Timeline">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={timeline === t}
                      onClick={() => setTimeline(t)}
                      className={`${chipBase} ${timeline === t ? chipOn : chipOff}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {/* ── 3. Brief ── */}
          {step === 2 && (
            <div>
              <label htmlFor="brief" className="font-display text-2xl italic leading-none text-[var(--silver)]">
                Tell me about the project
              </label>
              <p className="mt-2 font-sans text-sm text-[rgba(224,224,224,0.5)]">
                What are you building, who is it for, and what does done look like?
              </p>
              <textarea
                id="brief"
                value={brief}
                maxLength={BRIEF_MAX}
                onChange={(e) => setBrief(e.target.value)}
                rows={6}
                className="mt-4 w-full resize-y rounded-xl border border-[var(--card-border)] bg-black/30 p-4 font-sans text-sm text-[var(--silver)] outline-none transition-colors placeholder:text-[rgba(224,224,224,0.28)] focus:border-[rgba(125,211,252,0.5)]"
                placeholder="We need a storefront for a new apparel brand, launching before the season starts…"
              />
              <p className="mt-2 text-right font-code text-[10px] tracking-[0.14em] text-[rgba(224,224,224,0.35)]">
                {brief.length}/{BRIEF_MAX}
              </p>

              <label htmlFor="links" className="mt-6 block font-code text-[11px] tracking-[0.18em] text-[rgba(224,224,224,0.5)]">
                LINKS (OPTIONAL)
              </label>
              <input
                id="links"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-black/30 p-3.5 font-sans text-sm text-[var(--silver)] outline-none transition-colors placeholder:text-[rgba(224,224,224,0.28)] focus:border-[rgba(125,211,252,0.5)]"
                placeholder="Current site, a deck, a reference you like…"
              />

              <label htmlFor="name" className="mt-5 block font-code text-[11px] tracking-[0.18em] text-[rgba(224,224,224,0.5)]">
                YOUR NAME (OPTIONAL)
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--card-border)] bg-black/30 p-3.5 font-sans text-sm text-[var(--silver)] outline-none transition-colors placeholder:text-[rgba(224,224,224,0.28)] focus:border-[rgba(125,211,252,0.5)]"
                placeholder="So I know who I'm replying to"
              />
            </div>
          )}

          {/* ── 4. Send ── */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl italic leading-none text-[var(--silver)]">How should I reply?</h2>
              <p className="mt-2 font-sans text-sm text-[rgba(224,224,224,0.5)]">
                Both options open with your brief already filled in — nothing is sent until you send it.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={whatsappHref(intake)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onSend('whatsapp')}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(74,222,128,0.4)] bg-[rgba(74,222,128,0.1)] px-6 py-3 font-code text-[11px] tracking-[0.18em] text-[#4ade80] transition-all duration-300 hover:bg-[rgba(74,222,128,0.18)]"
                >
                  SEND ON WHATSAPP <span aria-hidden>→</span>
                </a>
                <a
                  href={mailtoHref(intake)}
                  onClick={() => onSend('email')}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(125,211,252,0.35)] bg-[rgba(125,211,252,0.06)] px-6 py-3 font-code text-[11px] tracking-[0.18em] text-[#7dd3fc] transition-all duration-300 hover:bg-[rgba(125,211,252,0.14)]"
                >
                  SEND BY EMAIL <span aria-hidden>→</span>
                </a>
              </div>

              {/* The fallback that makes the deep links safe: if no mail handler
                  is registered, the brief is still on screen and copyable. */}
              <div className="mt-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-code text-[11px] tracking-[0.18em] text-[rgba(224,224,224,0.45)]">
                    YOUR BRIEF
                  </p>
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-full border border-[var(--card-border)] px-3 py-1.5 font-code text-[10px] tracking-[0.14em] text-[rgba(224,224,224,0.6)] transition-colors hover:border-[rgba(125,211,252,0.4)] hover:text-[#7dd3fc]"
                  >
                    {copied ? 'COPIED' : 'COPY BRIEF'}
                  </button>
                </div>
                <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-[var(--card-border)] bg-black/30 p-4 font-code text-[11px] leading-relaxed text-[rgba(224,224,224,0.6)]">
                  {summary}
                </pre>
                <p className="mt-3 font-sans text-xs text-[rgba(224,224,224,0.4)]">
                  If nothing opens, paste it to{' '}
                  <a href={`mailto:${PERSON.email}`} className="text-[#7dd3fc] underline-offset-4 hover:underline">
                    {PERSON.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </motion.div>

      {/* ── Controls ── */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--card-border)] pt-6">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="font-code text-[11px] tracking-[0.18em] text-[rgba(224,224,224,0.5)] transition-opacity disabled:pointer-events-none disabled:opacity-0 hover:text-[var(--silver)]"
        >
          <span aria-hidden>←</span> BACK
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={() => go(step + 1)}
            disabled={!canAdvance}
            className="rounded-full border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] px-6 py-2.5 font-code text-[11px] tracking-[0.18em] text-[#4ade80] transition-all duration-300 enabled:hover:border-[rgba(74,222,128,0.6)] enabled:hover:bg-[rgba(74,222,128,0.16)] disabled:cursor-not-allowed disabled:opacity-35"
          >
            NEXT <span aria-hidden>→</span>
          </button>
        ) : (
          <span className="font-code text-[10px] tracking-[0.14em] text-[rgba(224,224,224,0.3)]">
            NOTHING IS STORED ON THIS SITE
          </span>
        )}
      </div>
    </div>
  )
}
