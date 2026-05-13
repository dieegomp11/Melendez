'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { TEAMS } from '@/lib/teams'
import { useTeamStore } from '@/lib/store'

/* ── Goal counter (isolated) ── */
function GoalCounter({ target, accent }: { target: number; accent: string }) {
  const numRef   = useRef<HTMLSpanElement>(null)
  const prevTarget = useRef(-1)

  useEffect(() => {
    if (prevTarget.current === target) return
    prevTarget.current = target
    const obj = { val: 0 }
    gsap.killTweensOf(obj)
    gsap.to(obj, {
      val: target,
      duration: 1.4,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.val))
      },
      onComplete: () => {
        if (!numRef.current) return
        gsap.fromTo(numRef.current, { x: -3 }, { x: 0, duration: 0.3, ease: 'elastic.out(2,0.3)' })
      },
    })
  }, [target])

  return (
    <span
      ref={numRef}
      className="font-display leading-none"
      style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', color: accent }}
    >
      0
    </span>
  )
}

/* ── Imagen con hueco placeholder ── */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

function TeamImage({ src, alt, position }: { src: string; alt: string; position: string }) {
  if (!src) {
    return (
      <div
        className="relative overflow-hidden rounded-lg md:aspect-[3/4] h-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}
      >
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-2 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <span className="font-mono text-[0.44rem] tracking-[0.2em] uppercase text-white/20">Próximamente</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg md:aspect-[3/4]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BASE + src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
    </div>
  )
}

/* ── Team content panel ── */
function TeamPanel({ team, visible }: { team: (typeof TEAMS)[0]; visible: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    if (visible) {
      gsap.killTweensOf(el)
      gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' })
    } else {
      gsap.killTweensOf(el)
      gsap.set(el, { opacity: 0 })
    }
  }, [visible])

  return (
    <div
      ref={panelRef}
      className="absolute inset-0"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 h-full items-center px-5 md:px-10 max-w-7xl mx-auto pt-36 md:pt-0">

        {/* Texto */}
        <div className="flex flex-col gap-4">
          <p
            className="font-mono text-[0.5rem] tracking-[0.32em] uppercase"
            style={{ color: team.timelineColor }}
          >
            {team.period} · {team.seasons}
          </p>

          <h3 className="font-display text-2xl sm:text-3xl md:text-5xl text-white leading-tight tracking-tight">
            {team.name}
          </h3>

          <p className="font-body text-sm text-white/50 leading-relaxed max-w-sm">
            {team.description}
          </p>

          <blockquote
            className="font-body text-xs text-white/40 italic leading-relaxed border-l-[1.5px] pl-3 max-w-xs"
            style={{ borderColor: `${team.timelineColor}55` }}
          >
            "{team.quote}"
          </blockquote>

          {/* Stats */}
          <div className="flex gap-6 mt-1">
            {team.goals > 0 && (
              <>
                <div className="flex flex-col items-start">
                  <GoalCounter target={team.goals} accent={team.timelineColor} />
                  <span className="font-mono text-[0.48rem] tracking-[0.22em] uppercase text-white/30 mt-0.5">
                    goles
                  </span>
                </div>
                <div className="w-px h-14 bg-white/8 self-center" />
              </>
            )}
            <div className="flex flex-col items-start">
              <span
                className="font-display leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', color: team.timelineColor }}
              >
                {team.matches}
              </span>
              <span className="font-mono text-[0.48rem] tracking-[0.22em] uppercase text-white/30 mt-0.5">
                partidos
              </span>
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 h-44 md:h-auto">
          {team.images.map((src, i) => (
            <TeamImage
              key={i}
              src={src}
              alt={`${team.name} — foto ${i + 1}`}
              position={team.imgPositions[i]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Timeline ── */
export default function Timeline() {
  const { activeIdx, setActiveIdx } = useTeamStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const teamH  = window.innerHeight
    const totalH = teamH * TEAMS.length

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect    = container.getBoundingClientRect()
        const scrolled = -rect.top
        const clamped  = Math.max(0, Math.min(scrolled, totalH - teamH))
        const idx      = Math.min(TEAMS.length - 1, Math.floor(clamped / teamH))
        if (idx !== activeIdx) setActiveIdx(idx)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [activeIdx, setActiveIdx])

  const progress = ((activeIdx + 1) / TEAMS.length) * 100

  return (
    <section id="trayectoria">
      <div ref={containerRef} style={{ height: `${TEAMS.length * 100}vh` }}>
        <div className="sticky top-0 min-h-[100dvh] bg-ink flex flex-col overflow-hidden">

          {/* ── Fondo: gradiente radial + líneas de campo ── */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Gradiente radial central con color del equipo activo */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 60%, ${TEAMS[0].accent}12 0%, transparent 70%)`,
              }}
            />
            {/* Líneas de campo */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.07]"
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Borde exterior */}
              <rect x="60" y="40" width="1320" height="820" fill="none" stroke="white" strokeWidth="1.2"/>
              {/* Línea central */}
              <line x1="720" y1="40" x2="720" y2="860" stroke="white" strokeWidth="1"/>
              {/* Círculo central */}
              <circle cx="720" cy="450" r="160" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="720" cy="450" r="4" fill="white"/>
              {/* Áreas */}
              <rect x="60"   y="270" width="220" height="360" fill="none" stroke="white" strokeWidth="0.9"/>
              <rect x="1160" y="270" width="220" height="360" fill="none" stroke="white" strokeWidth="0.9"/>
              {/* Áreas pequeñas */}
              <rect x="60"   y="355" width="80" height="190" fill="none" stroke="white" strokeWidth="0.8"/>
              <rect x="1300" y="355" width="80" height="190" fill="none" stroke="white" strokeWidth="0.8"/>
            </svg>
            {/* Viñeta oscura en los bordes */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(7,6,16,0.85) 100%)'
            }}/>
          </div>

          {/* Label */}
          <div className="absolute top-24 left-5 md:left-10 z-30 pointer-events-none hidden md:block">
            <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase" style={{ color: 'var(--accent)' }}>
              Trayectoria
            </p>
          </div>

          {/* Indicadores de equipo */}
          <div className="absolute top-20 left-0 right-0 z-30 flex justify-center">
            <div className="flex items-center gap-1 overflow-x-auto px-5 py-3 max-w-full">
              {TEAMS.map((team, i) => (
                <button
                  key={team.id}
                  onClick={() => setActiveIdx(i)}
                  className="flex items-center gap-1.5 flex-shrink-0 group px-2 py-1 rounded-full transition-all duration-300"
                  style={{
                    background: i === activeIdx ? `${team.timelineColor}18` : 'transparent',
                    border: i === activeIdx ? `1px solid ${team.timelineColor}40` : '1px solid transparent',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: i === activeIdx ? team.timelineColor : 'rgba(255,255,255,0.2)',
                      transform: i === activeIdx ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                  <span
                    className="font-mono text-[0.38rem] sm:text-[0.44rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase transition-colors duration-300"
                    style={{ color: i === activeIdx ? team.timelineColor : 'rgba(255,255,255,0.28)' }}
                  >
                    {team.shortName}
                  </span>
                  <span
                    className="font-mono text-[0.4rem] tracking-[0.1em] hidden md:block"
                    style={{ color: 'rgba(255,255,255,0.18)' }}
                  >
                    {team.period.split('—')[0].trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Paneles */}
          <div className="relative flex-1 pt-36 pb-12">
            {TEAMS.map((team, i) => (
              <TeamPanel key={team.id} team={team} visible={i === activeIdx} />
            ))}
          </div>

          {/* Barra de progreso */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/8">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: 'var(--accent)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
