'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TEXT_LINES = [
  'Físico, garra y calidad. Los tres en uno.',
  'Ale Melendez no es el mediocentro que pide el balón para guardarlo.',
  'Entra, recupera, construye, y llega. Con el cuerpo de quien no da',
  'ningún duelo por perdido y la visión de quien sabe que el partido',
  'se gana en los metros finales. El número 17 no corre el juego — lo rompe.',
]

/* ── Reproductor highlights ── */
function HighlightsPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying]     = useState(false)
  const [started, setStarted]     = useState(false)
  const [progress, setProgress]   = useState(0)
  const [hovering, setHovering]   = useState(false)
  const rafRef                    = useRef<number | null>(null)

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      setStarted(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }, [])

  /* progress tracking */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tick = () => {
      setProgress(v.duration ? v.currentTime / v.duration : 0)
      rafRef.current = requestAnimationFrame(tick)
    }
    const onPlay  = () => { rafRef.current = requestAnimationFrame(tick) }
    const onPause = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    const onEnd   = () => { setPlaying(false); setStarted(false); setProgress(0) }
    v.addEventListener('play',  onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnd)
    return () => {
      v.removeEventListener('play',  onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnd)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full"
      style={{
        aspectRatio: '16/9',
        background: '#04030a',
        border:    '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        cursor:    'pointer',
      }}
      onClick={toggle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video
        ref={videoRef}
        src="/highlights_web.mp4"
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
      />

      {/* Overlay con icono play/pause */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: !playing || hovering ? 1 : 0, background: playing ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.45)' }}
      >
        {/* Botón central */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200"
          style={{
            background:  'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border:      '1px solid rgba(255,255,255,0.2)',
            transform:   hovering ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {playing ? (
            /* Pause icon */
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              <rect x="4" y="3" width="4" height="14" rx="1"/>
              <rect x="12" y="3" width="4" height="14" rx="1"/>
            </svg>
          ) : (
            /* Play icon */
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path d="M6 4l11 6-11 6V4z"/>
            </svg>
          )}
        </div>

        {/* Label superior */}
        {!started && (
          <div className="absolute top-4 left-4">
            <span
              className="font-mono text-[0.44rem] tracking-[0.24em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(var(--accent-rgb),0.18)', color: 'var(--accent)', border: '1px solid rgba(var(--accent-rgb),0.3)' }}
            >
              Highlights · 1:49
            </span>
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      {started && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); seekTo(e) }}
        >
          <div
            className="h-full transition-none"
            style={{ width: `${progress * 100}%`, backgroundColor: 'var(--accent)' }}
          />
        </div>
      )}

      {/* Esquinas decorativas */}
      <span className="absolute top-2 left-2 w-4 h-4 border-t-[1.5px] border-l-[1.5px] pointer-events-none" style={{ borderColor: 'rgba(var(--accent-rgb),0.5)' }} />
      <span className="absolute top-2 right-2 w-4 h-4 border-t-[1.5px] border-r-[1.5px] pointer-events-none" style={{ borderColor: 'rgba(var(--accent-rgb),0.5)' }} />
      <span className="absolute bottom-2 left-2 w-4 h-4 border-b-[1.5px] border-l-[1.5px] pointer-events-none" style={{ borderColor: 'rgba(var(--accent-rgb),0.5)' }} />
      <span className="absolute bottom-2 right-2 w-4 h-4 border-b-[1.5px] border-r-[1.5px] pointer-events-none" style={{ borderColor: 'rgba(var(--accent-rgb),0.5)' }} />
    </div>
  )
}

/* ── Main section ── */
export default function Perfil() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll('.text-line')
      if (!lines) return
      gsap.from(lines, {
        opacity: 0, y: 18, stagger: 0.08, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: linesRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="perfil"
      ref={sectionRef}
      className="relative bg-profile bg-stripe-profile overflow-hidden py-24 md:py-36"
    >
      {/* Pitch background SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="720" cy="400" r="220" fill="none" stroke="white" strokeWidth="1" opacity="0.06"/>
        <line x1="720" y1="0" x2="720" y2="800" stroke="white" strokeWidth="0.8" opacity="0.04"/>
        <rect x="40" y="40" width="1360" height="720" fill="none" stroke="white" strokeWidth="0.8" opacity="0.04"/>
      </svg>

      {/* Editorial text + pills */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 mb-12 md:mb-16">
        <div className="md:flex md:items-end md:justify-between gap-10">
          <div className="md:max-w-xl">
            <p className="font-mono text-[0.52rem] tracking-[0.3em] uppercase mb-8" style={{ color: 'var(--accent)' }}>
              Perfil · Mediocentro
            </p>
            <div ref={linesRef} className="space-y-2">
              {TEXT_LINES.map((line, i) => (
                <p
                  key={i}
                  className={`text-line font-body leading-relaxed ${
                    i === 0 ? 'text-2xl md:text-3xl text-white font-medium' : 'text-sm md:text-base text-white/55'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Data pills */}
          <div className="flex flex-wrap gap-3 mt-10 md:mt-0 md:justify-end md:shrink-0">
            {[
              { label: 'Dorsal',    value: '#17' },
              { label: 'Posición',  value: 'Mediocentro' },
              { label: 'Equipo',    value: 'Albacete BP' },
              { label: 'División',  value: '2ª División' },
            ].map((d) => (
              <div
                key={d.label}
                className="flex flex-col gap-0.5 px-4 py-2.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="font-mono text-[0.44rem] tracking-[0.28em] uppercase text-white/30">{d.label}</span>
                <span className="font-body text-sm text-white/80">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video highlights — full width */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <HighlightsPlayer />
      </div>
    </section>
  )
}
