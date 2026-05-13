import type { Metadata } from 'next'
import { Bebas_Neue, Outfit, JetBrains_Mono, Bodoni_Moda } from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ale Melendez · Mediocentro · Albacete Balompié',
  description:
    'Web oficial de Ale Melendez, mediocentro del Albacete Balompié. Dorsal 17. El director de juego.',
  openGraph: {
    title: 'Ale Melendez · #17 · Albacete Balompié',
    description: 'Mediocentro. El juego se lee con la mente.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebas.variable} ${outfit.variable} ${jetbrains.variable} ${bodoni.variable}`}>
      <body>{children}</body>
    </html>
  )
}
