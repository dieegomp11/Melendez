import React from 'react'
import SocialLinks from './SocialLinks'

const NAV = [
  { label: 'Perfil', href: '#perfil' },
  { label: 'Stats', href: '#stats' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Highlights', href: '#highlights' },
]

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.06] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start mb-14">

          {/* Brand */}
          <div>
            {/* Accent line */}
            <div
              className="w-10 h-[1.5px] mb-5"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <div className="font-display text-3xl leading-none tracking-wide mb-3">
              <span className="text-white/35">ALE&nbsp;</span>
              <span className="text-white">MELÉNDEZ</span>
            </div>
            <p className="font-mono text-[0.5rem] tracking-[0.25em] uppercase text-white/25">
              Mediocentro · Albacete Balompié · Segunda División
            </p>
            <p className="font-body text-[0.75rem] text-white/30 mt-4 max-w-xs leading-relaxed">
              El director de juego del Carlos Belmonte. Dorsal 17.
              El mediocampo no se corre — se lee.
            </p>
          </div>

          {/* Nav + Socials */}
          <div className="flex flex-col gap-6">
            <nav className="flex flex-col gap-2">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-200 w-fit"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <SocialLinks direction="row" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-mono text-[0.44rem] tracking-[0.2em] uppercase text-white/20">
            Temporada 2024/25 · Todos los derechos reservados
          </span>
          <span className="font-mono text-[0.44rem] tracking-[0.2em] uppercase text-white/20">
            © 2025 Ale Melendez
          </span>
        </div>
      </div>
    </footer>
  )
}
