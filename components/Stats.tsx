'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ── Left: 2 filas × 3 columnas ── */
const LEFT_STATS = [
  { value: '37', label: 'Partidos', sub: 'temporada 24/25' },
  { value: '82.5%', label: 'Pases completados', sub: 'precisión media' },
  { value: '6.76', label: 'Recuperaciones', sub: 'por 90 min' },
  { value: '3.15', label: 'Pases largos prec.', sub: 'por 90 min' },
  { value: '0.85', label: 'Oport. creadas', sub: 'por 90 min' },
  { value: '60', label: 'Toques', sub: 'por 90 min' },
]

/* ── Right: métricas defensivas ── */
const RIGHT_STATS = [
  { value: '2.34', label: 'Entradas' },
  { value: '1.46', label: 'Despejes' },
  { value: '5.03', label: 'Duelos ganados' },
  { value: '5.26', label: 'Acciones defensivas' },
  { value: '1.19', label: 'Intercepciones' },
]

/* ── Parse "82.5%" → { num, suffix, decimals } ── */
function parseValue(raw: string) {
  const suffix = raw.endsWith('%') ? '%' : ''
  const clean = raw.replace('%', '')
  const num = parseFloat(clean)
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0
  return { num, suffix, decimals }
}

/* ── Left monument counter ── */
function LeftCounter({ value, label, sub }: { value: string; label: string; sub: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = spanRef.current
    if (!el) return
    const { num, suffix, decimals } = parseValue(value)
    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      onEnter: () => {
        gsap.to(obj, {
          val: num,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => { if (el) el.textContent = obj.val.toFixed(decimals) + suffix },
          onComplete: () => { if (el) el.textContent = value },
        })
      },
      once: true,
    })
    return () => st.kill()
  }, [value])

  return (
    <div className="flex flex-col gap-0.5">
      <span
        ref={spanRef}
        className="font-display leading-none text-zinc-900"
        style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.8rem)' }}
      >
        {value}
      </span>
      <span className="font-mono text-[0.46rem] tracking-[0.18em] uppercase text-zinc-500">
        {label}
      </span>
      <span className="font-body text-[0.6rem] text-zinc-400">{sub}</span>
    </div>
  )
}

/* ── Right row counter ── */
function RightCounter({ value, label }: { value: string; label: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = spanRef.current
    if (!el) return
    const { num, suffix, decimals } = parseValue(value)
    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(obj, {
          val: num,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => { if (el) el.textContent = obj.val.toFixed(decimals) + suffix },
          onComplete: () => { if (el) el.textContent = value },
        })
      },
      once: true,
    })
    return () => st.kill()
  }, [value])

  return (
    <div className="stat-row flex items-center justify-between py-5">
      <span className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-zinc-500">
        {label}
      </span>
      <span
        ref={spanRef}
        className="font-display text-zinc-900 leading-none tabular-nums"
        style={{ fontSize: 'clamp(2rem, 3.2vw, 3.6rem)' }}
      >
        {value}
      </span>
    </div>
  )
}

/* ── Stats section ── */
export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.stat-row', {
        x: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 82%' },
      })

      gsap.from('.stat-img', {
        opacity: 0,
        scale: 1.04,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: imagesRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="bg-cream relative overflow-hidden film-grain py-24 md:py-36"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p className="font-mono text-[0.5rem] tracking-[0.32em] uppercase text-zinc-400 mb-3">
            Estadísticas · Temporada 25/26
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-zinc-900 leading-none tracking-tighter">
            EL MOTOR DEL MEDIOCAMPO
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-20 items-start">

          {/* ── Izquierda: 2 filas × 3 cols + fotos ── */}
          <div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-8 mb-10">
              {LEFT_STATS.map((s) => (
                <LeftCounter key={s.label} {...s} />
              ))}
            </div>

            {/* Fotos BN */}
            <div ref={imagesRef} className="grid grid-cols-2 gap-2">
              <div className="stat-img relative overflow-hidden rounded aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Stats/AleStats1.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.05)', objectPosition: '50% 20%' }}
                />
              </div>
              <div className="stat-img relative overflow-hidden rounded aspect-square self-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Stats/AleStats2.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.05)', objectPosition: '50% 30%' }}
                />
              </div>
            </div>
          </div>

          {/* ── Derecha: 5 métricas ── */}
          <div ref={rightRef} className="flex flex-col justify-center lg:pt-2">
            <p className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-zinc-400 mb-6">
              Métricas defensivas · por 90 min
            </p>

            <div className="flex flex-col divide-y divide-zinc-200">
              {RIGHT_STATS.map((s) => (
                <RightCounter key={s.label} {...s} />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200">
              <p className="font-body text-[0.68rem] text-zinc-400 leading-relaxed">
                Datos correspondientes a la temporada 2025/26 en Segunda División.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
