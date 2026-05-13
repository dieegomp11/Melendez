'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Clip {
  id:            string
  label:         string
  tag:           string
  tagColor:      string
  poster:        string
  objectPosition:string
}

const CLIPS: Clip[] = [
  { id: 'c1', label: 'Asistencia de tacón vs Eibar',         tag: 'Fuera de serie',  tagColor: '#10b981', poster: 'https://picsum.photos/seed/clip1/300/533', objectPosition: '50% 30%' },
  { id: 'c2', label: 'Golazo de media distancia',            tag: 'Último segundo',  tagColor: '#CC1F1F', poster: 'https://picsum.photos/seed/clip2/300/533', objectPosition: '50% 20%' },
  { id: 'c3', label: 'Pase filtrado entre líneas',           tag: 'Visión de juego', tagColor: '#C9A84C', poster: 'https://picsum.photos/seed/clip3/300/533', objectPosition: '50% 35%' },
  { id: 'c4', label: 'Recuperación + salida rápida',         tag: 'Presión alta',    tagColor: '#f97316', poster: 'https://picsum.photos/seed/clip4/300/533', objectPosition: '50% 25%' },
  { id: 'c5', label: 'Cambio de juego con el exterior',      tag: 'Fuera de serie',  tagColor: '#10b981', poster: 'https://picsum.photos/seed/clip5/300/533', objectPosition: '50% 30%' },
  { id: 'c6', label: 'Gol de falta directa',                 tag: 'Decisivo',        tagColor: '#CC1F1F', poster: 'https://picsum.photos/seed/clip6/300/533', objectPosition: '50% 20%' },
]

function ClipCard({ clip }: { clip: Clip }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else         { v.play().catch(() => {}); setPlaying(true) }
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      style={{ aspectRatio: '9/16' }}
      onClick={toggle}
    >
      {/* Poster fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={clip.poster}
        alt={clip.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: clip.objectPosition }}
      />

      {/* video element — no src yet, placeholder */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="metadata"
        style={{ display: playing ? 'block' : 'none' }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: playing ? 0 : 0.75 }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(var(--accent-rgb),0.15)', border: '1px solid rgba(var(--accent-rgb),0.4)' }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="var(--accent)">
            <path d="M1 1l10 6L1 13V1z"/>
          </svg>
        </div>
      </div>

      {/* Tag */}
      <div className="absolute top-3 left-3">
        <span
          className="font-mono text-[0.44rem] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: clip.tagColor + 'cc' }}
        >
          {clip.tag}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-3 right-3">
        <p className="font-body text-[0.65rem] text-white/80 leading-snug">{clip.label}</p>
      </div>
    </div>
  )
}

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.clip-card')
      if (!cards) return
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="bg-midnight py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-12">
          <p
            className="font-mono text-[0.5rem] tracking-[0.32em] uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Highlights · 24/25
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none tracking-tighter">
            MOMENTOS<br />QUE DEFINEN
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {CLIPS.map((clip) => (
            <div key={clip.id} className="clip-card">
              <ClipCard clip={clip} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
