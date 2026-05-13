'use client'
import React, { useState, useEffect } from 'react'
import SocialLinks from './SocialLinks'

const NAV_ITEMS = [
  { label: 'Perfil',      href: '#perfil' },
  { label: 'Stats',       href: '#stats' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Highlights',  href: '#copa' },
]

const GOLD = '#C9A84C'

export default function Navbar() {
  const [active, setActive] = useState('')

  useEffect(() => {
    // rootMargin: franja horizontal del 20% central — funciona con secciones de cualquier alto
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    NAV_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Resetear acento a dorado cuando se sale de trayectoria
  useEffect(() => {
    if (active !== 'trayectoria') {
      document.documentElement.style.setProperty('--accent', GOLD)
    }
  }, [active])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
      {/* Logotype */}
      <a href="#" className="flex items-center gap-2.5" aria-label="Ale Melendez home">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: 'var(--accent)', animation: 'accentPulse 2.5s ease-in-out infinite' }}
        />
        <span className="font-display text-xl tracking-wider">
          <span className="text-white/40">ALE&nbsp;</span>
          <span className="text-white">MELÉNDEZ</span>
        </span>
      </a>

      {/* Nav central — oculto en móvil */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href.slice(1)
          return (
            <a
              key={item.label}
              href={item.href}
              className={`relative px-4 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-white/35 hover:text-white/70'
              }`}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(var(--accent-rgb),0.12)',
                    border: '1px solid rgba(var(--accent-rgb),0.25)',
                  }}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          )
        })}
      </nav>

      {/* Móvil: 4 dots */}
      <nav className="flex md:hidden items-center gap-3">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href.slice(1)
          return (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                transform: isActive ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          )
        })}
      </nav>

      {/* Socials */}
      <div className="hidden sm:flex">
        <SocialLinks direction="row" className="gap-5" />
      </div>
    </header>
  )
}
