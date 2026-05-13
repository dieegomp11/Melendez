'use client'
import React, { useEffect, useRef, useState } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface Moment {
  id: string
  title: string
  homeTeam: string
  awayTeam: string
  homeShield: string
  awayShield: string
  year: string
  competition: string
  result: string
  resultSub: string
  outcome: 'win' | 'loss'
  description: string
  images: string[]
  imgPositions: string[]
  scrollVh: number
  accent: string
}

const MOMENTS: Moment[] = [
  {
    id: 'debut',
    title: 'El Debut',
    homeTeam: 'Ato. Antoniano',
    awayTeam: 'Real Betis',
    homeShield: '/Antoniano.png',
    awayShield: '/RealBetis.png',
    year: '2019',
    competition: 'Copa del Rey',
    result: '0 — 4',
    resultSub: 'Debut + gol',
    outcome: 'win',
    description: 'Primera vez vistiendo la camiseta del primer equipo del Real Betis, fuera de casa. Entró al campo, marcó, y demostró que estaba listo para el siguiente nivel.',
    images: ['/Copa/AleDebut.jpg'],
    imgPositions: ['center center'],
    scrollVh: 1,
    accent: '#00A650',
  },
  {
    id: 'linares-barca',
    title: 'David Contra Goliat',
    homeTeam: 'Linares Deportivo',
    awayTeam: 'FC Barcelona',
    homeShield: '/Linarespng.png',
    awayShield: '/Barcelona.webp',
    year: '2022',
    competition: 'Copa del Rey',
    result: '1 — 2',
    resultSub: 'Un partido de leyenda',
    outcome: 'loss',
    description: 'Con el Linares Deportivo ante el Barça de Busquets. Cayeron 1-2 pero dejaron una actuación que el fútbol español no olvidará. El mediocampo de Linares no le dio un centímetro al mejor equipo del mundo.',
    images: ['/Copa/AleBusquets.jpg'],
    imgPositions: ['center center'],
    scrollVh: 1,
    accent: '#4A8FD4',
  },
  {
    id: 'celta',
    title: 'Resistencia Heroica',
    homeTeam: 'Albacete Balompié',
    awayTeam: 'Celta de Vigo',
    homeShield: '/albacetepng.png',
    awayShield: '/Celta.webp',
    year: '2025',
    competition: 'Copa del Rey 25/26',
    result: '2 — 2',
    resultSub: 'Victoria en penaltis',
    outcome: 'win',
    description: 'Aspas lo intentó todo pero los penaltis fueron del Albacete. Primera piedra de la gesta más grande del club en décadas. 120 minutos para Ale en un partido marcado por la exigencia física.',
    images: ['/Copa/AleAspas1.jpg', '/Copa/AleAspas2.jpg'],
    imgPositions: ['center 65%', 'center 55%'],
    scrollVh: 1.5,
    accent: '#6CC0E5',
  },
  {
    id: 'madrid',
    title: 'Magia en el Belmonte',
    homeTeam: 'Albacete Balompié',
    awayTeam: 'Real Madrid',
    homeShield: '/albacetepng.png',
    awayShield: '/Madrid.svg',
    year: '2025',
    competition: 'Copa del Rey 25/26 · Octavos',
    result: '3 — 2',
    resultSub: 'Victoria histórica',
    outcome: 'win',
    description: 'Octavos de final. Vinicius, Valverde, Arda Güler… todos cayeron en el Belmonte. Nadie lo creyó posible hasta que el árbitro pitó el final. La noche más grande del Albacete Balompié.',
    images: ['/Copa/AleArda1.jpg', '/Copa/AleArda2.jpg', '/Copa/AleValverde1.jpg', '/Copa/AleValverde2.jpg'],
    imgPositions: ['35% center', '35% center', 'center center', 'center center'],
    scrollVh: 2,
    accent: '#C9A84C',
  },
  {
    id: 'barca',
    title: 'El Final del Sueño',
    homeTeam: 'Albacete Balompié',
    awayTeam: 'FC Barcelona',
    homeShield: '/albacetepng.png',
    awayShield: '/Barcelona.webp',
    year: '2025',
    competition: 'Copa del Rey 25/26 · Cuartos',
    result: '1 — 2',
    resultSub: 'Cuartos · Eliminados',
    outcome: 'loss',
    description: 'El Carlos Belmonte vivió una noche de ensueño. Yamal y Araújo acabaron con el sueño. El Albacete perdió dignamente ante el campeón, dejando huella en la historia del club.',
    images: ['/Copa/AleRashford1.jpg', '/Copa/AleRashford2.jpg'],
    imgPositions: ['center center', 'center center'],
    scrollVh: 1.5,
    accent: '#A50044',
  },
]

const TOTAL_VH = MOMENTS.reduce((sum, m) => sum + m.scrollVh, 0)

export default function NochesHistoricas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const momentIdxRef = useRef(0)
  const imageIdxRef = useRef(0)
  const [momentIdx, setMomentIdx] = useState(0)
  const [imageIdx, setImageIdx] = useState(0)
  const [txType, setTxType] = useState<'moment' | 'image'>('moment')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const screenH = window.innerHeight
        const rect = container.getBoundingClientRect()
        const scrolled = Math.max(0, -rect.top)
        const maxPx = TOTAL_VH * screenH
        const clamped = Math.min(scrolled, maxPx)

        let cumulative = 0
        for (let i = 0; i < MOMENTS.length; i++) {
          const momentPx = MOMENTS[i].scrollVh * screenH
          if (clamped < cumulative + momentPx || i === MOMENTS.length - 1) {
            const localProgress = Math.max(0, Math.min(1, (clamped - cumulative) / momentPx))
            const imgIdx = Math.min(
              MOMENTS[i].images.length - 1,
              Math.floor(localProgress * MOMENTS[i].images.length)
            )
            if (i !== momentIdxRef.current) {
              momentIdxRef.current = i
              imageIdxRef.current = 0
              setTxType('moment')
              setMomentIdx(i)
              setImageIdx(0)
            } else if (imgIdx !== imageIdxRef.current) {
              imageIdxRef.current = imgIdx
              setTxType('image')
              setImageIdx(imgIdx)
            }
            break
          }
          cumulative += MOMENTS[i].scrollVh * screenH
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const m = MOMENTS[momentIdx]

  // Duración de transición según tipo: corte rápido para fotogramas, fade largo para cambio de momento
  const imgTx = txType === 'image'
    ? 'opacity 0.22s ease, transform 0.22s ease'
    : 'opacity 0.55s ease, transform 0.55s ease'

  return (
    <section id="copa">
      <div ref={containerRef} style={{ height: `${(TOTAL_VH + 1) * 100}vh` }}>
        <div className="sticky top-0 min-h-[100dvh] bg-ink flex overflow-hidden">

          {/* ── Fondo animado ── */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            {/* Orbe flotante con color del equipo activo */}
            <div
              className="absolute rounded-full blur-[120px] transition-colors duration-700"
              style={{
                width: '55%', height: '70%',
                top: '10%', left: '-10%',
                background: `radial-gradient(ellipse, ${m.accent}18 0%, transparent 70%)`,
                animation: 'nochesFloat 14s ease-in-out infinite',
              }}
            />
            {/* Segundo orbe, más pequeño */}
            <div
              className="absolute rounded-full blur-[90px]"
              style={{
                width: '35%', height: '45%',
                bottom: '5%', left: '5%',
                background: `radial-gradient(ellipse, ${m.accent}0e 0%, transparent 70%)`,
                animation: 'nochesFloat2 20s ease-in-out infinite',
              }}
            />
            {/* Líneas de campo SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.05]"
              viewBox="0 0 900 600"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Campo completo */}
              <rect x="30" y="25" width="840" height="550" fill="none" stroke="white" strokeWidth="1.2" />
              {/* Línea central */}
              <line x1="450" y1="25" x2="450" y2="575" stroke="white" strokeWidth="1" />
              {/* Círculo central */}
              <circle cx="450" cy="300" r="110" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="450" cy="300" r="3.5" fill="white" />
              {/* Área grande izquierda */}
              <rect x="30" y="175" width="145" height="250" fill="none" stroke="white" strokeWidth="0.9" />
              {/* Área pequeña izquierda */}
              <rect x="30" y="230" width="52" height="140" fill="none" stroke="white" strokeWidth="0.8" />
              {/* Punto penalty izquierdo */}
              <circle cx="97" cy="300" r="3" fill="white" />
              {/* Arco área izquierda */}
              <path d="M 175 230 A 75 75 0 0 1 175 370" fill="none" stroke="white" strokeWidth="0.9" />
              {/* Área grande derecha */}
              <rect x="725" y="175" width="145" height="250" fill="none" stroke="white" strokeWidth="0.9" />
              {/* Área pequeña derecha */}
              <rect x="818" y="230" width="52" height="140" fill="none" stroke="white" strokeWidth="0.8" />
              {/* Punto penalty derecho */}
              <circle cx="803" cy="300" r="3" fill="white" />
              {/* Arco área derecha */}
              <path d="M 725 230 A 75 75 0 0 0 725 370" fill="none" stroke="white" strokeWidth="0.9" />
              {/* Córners */}
              <path d="M 30 45 A 15 15 0 0 1 45 25" fill="none" stroke="white" strokeWidth="0.8" />
              <path d="M 855 45 A 15 15 0 0 0 840 25" fill="none" stroke="white" strokeWidth="0.8" />
              <path d="M 30 555 A 15 15 0 0 0 45 575" fill="none" stroke="white" strokeWidth="0.8" />
              <path d="M 855 555 A 15 15 0 0 1 840 575" fill="none" stroke="white" strokeWidth="0.8" />
            </svg>
            {/* Viñeta oscura borde derecho para no solapar con imagen */}
            <div className="absolute inset-y-0 right-0 w-[58%] bg-gradient-to-l from-[#05040d] via-transparent to-transparent" />
          </div>

          {/* ── Panel izquierdo: texto ── */}
          <div className="relative z-20 w-full md:w-[44%] flex flex-col justify-center px-5 md:pl-20 lg:pl-28 md:pr-6 pt-28 pb-10 flex-shrink-0">

            {/* Label */}
            <p
              className="font-mono text-[0.48rem] tracking-[0.32em] uppercase mb-10 transition-colors duration-500"
              style={{ color: m.accent }}
            >
              Noches Históricas
            </p>

            {/* Paneles de texto apilados */}
            <div className="relative min-h-[340px]">
              {MOMENTS.map((moment, i) => (
                <div
                  key={moment.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity: i === momentIdx ? 1 : 0,
                    transform: `translateY(${i === momentIdx ? '0px' : '14px'})`,
                    transition: 'opacity 0.52s ease, transform 0.52s ease',
                    pointerEvents: i === momentIdx ? 'auto' : 'none',
                  }}
                  aria-hidden={i !== momentIdx}
                >
                  <p
                    className="font-mono text-[0.46rem] tracking-[0.26em] uppercase mb-3"
                    style={{ color: `${moment.accent}bb` }}
                  >
                    {moment.competition} · {moment.year}
                  </p>

                  <h2 className="font-display text-3xl md:text-5xl lg:text-[3.8rem] text-white leading-none tracking-tighter mb-5">
                    {moment.title}
                  </h2>

                  {/* Escudos + marcador */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={BASE + moment.homeShield} alt={moment.homeTeam} className="w-full h-full object-contain" />
                    </div>
                    <span
                      className="font-display leading-none tabular-nums"
                      style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)', color: moment.accent }}
                    >
                      {moment.result}
                    </span>
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={BASE + moment.awayShield} alt={moment.awayTeam} className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <span className="font-mono text-[0.43rem] tracking-[0.15em] uppercase text-white/28">
                      {moment.homeTeam} · {moment.awayTeam}
                    </span>
                    <span
                      className="font-mono text-[0.41rem] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: moment.outcome === 'win' ? `${moment.accent}20` : 'rgba(255,80,80,0.12)',
                        color: moment.outcome === 'win' ? moment.accent : '#ff8080',
                        border: `1px solid ${moment.outcome === 'win' ? `${moment.accent}3a` : 'rgba(255,80,80,0.25)'}`,
                      }}
                    >
                      {moment.resultSub}
                    </span>
                  </div>

                  <p className="font-body text-sm text-white/42 leading-relaxed max-w-[280px]">
                    {moment.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Dots de progreso */}
            <div className="flex flex-col gap-2 mt-8">
              {MOMENTS.map((moment, i) => (
                <div
                  key={moment.id}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === momentIdx ? '28px' : '6px',
                    height: '3px',
                    backgroundColor: i === momentIdx ? moment.accent : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Panel derecho: imagen a tamaño natural ── */}
          <div className="hidden md:flex relative flex-1 items-center justify-center bg-[#05040d] overflow-hidden">

            {/* Blend suave en el borde izquierdo */}
            <div
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #070610 0%, transparent 100%)' }}
            />
            {/* Viñeta superior e inferior */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#05040d] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#05040d] to-transparent z-10 pointer-events-none" />

            {/* Imágenes — tamaño natural, contenidas en la zona visible */}
            {MOMENTS.flatMap((moment, mi) =>
              moment.images.map((src, ii) => {
                const active = momentIdx === mi && imageIdx === ii
                return (
                  <div
                    key={`${mi}-${ii}`}
                    className="absolute inset-0 flex items-center justify-center p-8"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? 'translateX(0px)' : `translateX(${txType === 'image' ? '18px' : '0px'})`,
                      transition: imgTx,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={BASE + src}
                      alt=""
                      style={{
                        maxWidth: '100%',
                        maxHeight: '78dvh',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                      }}
                    />
                  </div>
                )
              })
            )}

            {/* Dots de fotograma para jugadas multi-imagen */}
            {m.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                {m.images.map((_, ii) => (
                  <div
                    key={ii}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: ii === imageIdx ? '20px' : '5px',
                      height: '3px',
                      backgroundColor: ii === imageIdx ? m.accent : 'rgba(255,255,255,0.18)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Barra de progreso inferior ── */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/5 z-30">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${((momentIdx + 1) / MOMENTS.length) * 100}%`, backgroundColor: m.accent }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

