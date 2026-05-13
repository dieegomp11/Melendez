'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ── Pitch lines SVG ─────────────────────────────────────────────── */
function PitchLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle cx="720" cy="450" r="180" fill="none" stroke="white" strokeWidth="1" opacity="0.10" />
      <circle cx="720" cy="450" r="4"   fill="white" opacity="0.10" />
      <line x1="720" y1="0" x2="720" y2="900" stroke="white" strokeWidth="1" opacity="0.08" />
      <rect x="60" y="60" width="1320" height="780" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
      <rect x="60"   y="270" width="198" height="360" fill="none" stroke="white" strokeWidth="0.9" opacity="0.06" />
      <rect x="1182" y="270" width="198" height="360" fill="none" stroke="white" strokeWidth="0.9" opacity="0.06" />
    </svg>
  )
}

/* ── Jersey number — CSS puro, 100% responsivo ───────────────────── */
function JerseyNumber() {
  return (
    <span
      aria-hidden="true"
      className="font-display leading-none select-none block"
      style={{
        fontSize:              'clamp(5rem, 11vw, 12rem)',
        WebkitTextStroke:      '1px rgba(201,168,76,0.75)',
        color:                 'transparent',
        backgroundImage:       'repeating-linear-gradient(42deg, rgba(201,168,76,0.28) 0px, rgba(201,168,76,0.28) 1.5px, transparent 1.5px, transparent 9px)',
        WebkitBackgroundClip:  'text',
        backgroundClip:        'text',
        lineHeight:            0.9,
      }}
    >
      17
    </span>
  )
}

/* ── Next match card ─────────────────────────────────────────────── */
function NextMatchCard() {
  return (
    <div
      className="relative rounded-xl overflow-hidden px-5 py-4 w-[260px] sm:w-[300px]"
      style={{
        background:    'rgba(13,11,30,0.75)',
        backdropFilter:'blur(12px)',
        border:        '1px solid rgba(201,168,76,0.18)',
        boxShadow:     'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-[0.48rem] tracking-[0.3em] uppercase px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(var(--accent-rgb),0.15)', color: 'var(--accent)' }}
        >
          Próximo partido
        </span>
        <span className="font-mono text-[0.48rem] tracking-[0.2em] text-white/35 uppercase">
          Vie · 21:00
        </span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-9 h-9 flex items-center justify-center">
            <Image src="/cordoba.png" alt="Córdoba CF" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <span className="font-mono text-[0.5rem] text-white/50 tracking-wider">Córdoba</span>
        </div>
        <span className="font-display text-xl text-white/25 leading-none">vs</span>
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-9 h-9 flex items-center justify-center">
            <Image src="/albacetepng.png" alt="Albacete Balompié" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <span className="font-mono text-[0.5rem] text-white/50 tracking-wider">Albacete</span>
        </div>
      </div>
      <div className="h-px bg-white/8 mb-2" />
      <p className="font-mono text-[0.48rem] tracking-[0.2em] text-white/25 uppercase text-center">
        Nuevo Arcángel · 15 may 2025
      </p>
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────────────── */
const PLAYER_IMGS = [
  { src: '/AleMelendez.png',  w: 1296, h: 1104 },
  { src: '/AleMelendez2.png', w: 634,  h: 881  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const playerRef  = useRef<HTMLDivElement>(null)
  const [imgIdx, setImgIdx] = useState(0)
  const nameRef    = useRef<HTMLDivElement>(null)
  const numberRef  = useRef<HTMLDivElement>(null)
  const quoteRef   = useRef<HTMLDivElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)
  const matchRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(playerRef.current, { y: 70, opacity: 0, duration: 1.1 }, 0.2)
        .from(nameRef.current,   { y: 60, opacity: 0, duration: 0.9, ease: 'power4.out' }, 0.3)
        .from(numberRef.current, { opacity: 0, x: 30, duration: 0.7, ease: 'expo.out' }, 0.65)
        .from(quoteRef.current,  { opacity: 0, y: 22, duration: 0.6 }, 0.85)
        .from(badgeRef.current,  { opacity: 0, y: 16, duration: 0.5 }, 1.0)
        .from(matchRef.current,  { opacity: 0, y: 16, duration: 0.5 }, 1.1)

      /* scroll: jugador asciende y desaparece */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=60%',
        scrub: 1.2,
        onUpdate: (self) => {
          if (playerRef.current) {
            gsap.set(playerRef.current, {
              y:       -self.progress * 55,
              opacity: 1 - self.progress * 0.65,
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* Alterna entre las dos fotos cada 4 s (arranca tras 2.5 s para dejar entrar la animación) */
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => setImgIdx(i => i === 0 ? 1 : 0), 4000)
      return () => clearInterval(interval)
    }, 2500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] bg-ink overflow-hidden"
    >
      {/* ── Aurora ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[-25%] left-[-15%] w-[75%] h-[75%] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, #1a0f4a 0%, transparent 70%)', opacity: 0.35, animation: 'auroraFloat 22s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[65%] h-[65%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(ellipse, #0a1030 0%, transparent 70%)', opacity: 0.28, animation: 'auroraFloat2 28s ease-in-out infinite' }}
        />
        <div
          className="absolute top-[35%] right-[22%] w-[38%] h-[38%] rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(ellipse, #1a0d00 0%, transparent 70%)', opacity: 0.18 }}
        />
      </div>

      <PitchLines />

      {/* ── Quote + posición — arriba izquierda ── */}
      <div
        ref={quoteRef}
        className="absolute top-[18%] left-5 md:left-10 max-w-[240px] z-20 pointer-events-none"
      >
        <p className="font-mono text-[0.52rem] tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
          Mediocentro · Albacete Balompié
        </p>
        <blockquote
          className="font-body text-xs text-white/50 italic leading-relaxed border-l-[1.5px] pl-3"
          style={{ borderColor: 'rgba(var(--accent-rgb),0.4)' }}
        >
          "El juego se lee con la mente,<br />no solo con los pies."
        </blockquote>
        <cite className="font-mono text-[0.47rem] tracking-[0.3em] uppercase text-white/25 mt-2 block not-italic">
          — Ale Melendez
        </cite>
      </div>

      {/* ── Número 17 — arriba derecha, contenido dentro de la pantalla ── */}
      <div
        ref={numberRef}
        className="absolute z-20 pointer-events-none"
        style={{
          top:   'clamp(60px, 10%, 110px)',
          right: 'clamp(12px, 3vw, 40px)',
        }}
      >
        <JerseyNumber />
      </div>

      {/* ── Nombre ALE MELÉNDEZ — centrado en el hero, detrás del jugador (z-5) ── */}
      <div
        ref={nameRef}
        aria-label="Ale Melendez"
        className="absolute left-0 right-0 z-[5] pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <span
          className="leading-none select-none whitespace-nowrap"
          style={{
            fontFamily:    'var(--font-bodoni), serif',
            fontWeight:    900,
            fontSize:      'clamp(2.5rem, 9.5vw, 12.5rem)',
            color:         'var(--accent)',
            opacity:       0.85,
            letterSpacing: '0.04em',
          }}
        >
          ALE&nbsp;
        </span>
        <span
          className="leading-none select-none whitespace-nowrap text-white"
          style={{
            fontFamily:    'var(--font-bodoni), serif',
            fontWeight:    900,
            fontSize:      'clamp(2.5rem, 9.5vw, 12.5rem)',
            opacity:       0.82,
            letterSpacing: '0.04em',
          }}
        >
          MELÉNDEZ
        </span>
      </div>

      {/* ── Foto jugador — sobre el nombre (z-10) ── */}
      <div
        ref={playerRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{ height: 'clamp(420px, 95dvh, 1800px)', width: 'auto', maxWidth: '94vw' }}
      >
        {PLAYER_IMGS.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt="Ale Melendez"
            width={img.w}
            height={img.h}
            priority={i === 0}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              height:         '100%',
              width:          'auto',
              maxWidth:       '94vw',
              objectFit:      'contain',
              objectPosition: 'bottom center',
              filter:         'drop-shadow(0 0 80px rgba(201,168,76,0.12))',
              opacity:        i === imgIdx ? 1 : 0,
              transition:     'opacity 0.9s ease',
            }}
          />
        ))}
        {/* fade suave en los pies */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ── Badge posición — abajo izquierda ── */}
      <div
        ref={badgeRef}
        className="absolute bottom-8 md:bottom-12 left-5 md:left-10 z-20 flex flex-col gap-1.5"
      >
        <div
          className="font-mono text-[0.5rem] tracking-[0.28em] uppercase px-3 py-1.5 rounded-full w-fit"
          style={{
            background: 'rgba(var(--accent-rgb),0.12)',
            border:     '1px solid rgba(var(--accent-rgb),0.3)',
            color:      'var(--accent)',
          }}
        >
          13-05-1999 · Utrera (Sevilla) · 27 años
        </div>
        <a
          href="#perfil"
          className="cta-wrap flex items-center gap-3 group mt-1"
          aria-label="Ver perfil"
        >
          <span className="cta-line" />
          <span className="font-mono text-[0.52rem] tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300">
            Ver perfil
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/35 group-hover:text-white/60 transition-colors">
            <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Próximo partido — abajo derecha ── */}
      <div
        ref={matchRef}
        className="absolute bottom-8 md:bottom-12 right-5 md:right-10 z-20 hidden sm:block"
      >
        <NextMatchCard />
      </div>

      {/* ── Gradiente inferior ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink via-ink/60 to-transparent pointer-events-none z-[3]" />
    </section>
  )
}
