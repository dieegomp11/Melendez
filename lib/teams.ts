export interface Team {
  id: string
  name: string
  shortName: string
  period: string
  seasons: string
  goals: number
  matches: number
  accent: string
  timelineColor: string
  quote: string
  description: string
  images: string[]   // '' = hueco pendiente de foto
  imgPositions: [string, string]
}

export const TEAMS: Team[] = [
  {
    id: 'betis',
    name: 'Real Betis B',
    shortName: 'Betis B',
    period: '2017 — 2020',
    seasons: '3 temporadas',
    goals: 5,
    matches: 56,
    accent: '#00A650',
    timelineColor: '#00A650',
    quote: 'La cantera bética me enseñó que el trabajo diario es la única forma de llegar.',
    description: 'Tres temporadas de formación en la disciplina bética que marcaron su identidad como mediocampista. La etapa culminó con el ascenso del equipo a Segunda División B.',
    images: ['/Betis/AleBetis1.jpg', '/Betis/AleBetis2.jpg'],
    imgPositions: ['50% 25%', '34% 25%'],
  },
  {
    id: 'oviedo',
    name: 'Real Oviedo Vetusta',
    shortName: 'Oviedo',
    period: '2021',
    seasons: '1 temporada',
    goals: 0,
    matches: 16,
    accent: '#003DA5',
    timelineColor: '#5B8DD9',
    quote: 'El Tartiere me hizo más grande. Competir en ese ambiente te cambia para siempre.',
    description: 'Una experiencia que templó el carácter. El rigor táctico asturiano dejó huella en su forma de entender la presión alta y el juego sin balón.',
    images: ['/Oviedo/AleOviedo1.jpg', '/Oviedo/AleOviedo2.jpg'],
    imgPositions: ['42% 25%', '50% 25%'],
  },
  {
    id: 'linares',
    name: 'Linares Deportivo',
    shortName: 'Linares',
    period: '2021 — 2022',
    seasons: '1 temporada',
    goals: 0,
    matches: 37,
    accent: '#1E55A0',
    timelineColor: '#4A8FD4',
    quote: 'Llegamos a las puertas de Segunda. El sabor amargo del playoff me dio más hambre que nunca.',
    description: 'Gran temporada en Primera RFEF donde el equipo alcanzó el playoff de ascenso a Segunda División. A un paso del sueño — el combustible para lo que vendría después.',
    images: ['/Linares/AleLinares1.jpg', '/Linares/AleLinares2.jpg'],
    imgPositions: ['70% 25%', '50% 25%'],
  },
  {
    id: 'merida',
    name: 'Mérida AD',
    shortName: 'Mérida',
    period: '2022 — 2023',
    seasons: '1 temporada',
    goals: 0,
    matches: 38,
    accent: '#8B1A1A',
    timelineColor: '#ffffff',
    quote: 'Rozamos el playoff con las yemas de los dedos. Esa temporada me hizo más determinado.',
    description: 'Sólida campaña en Primera RFEF donde el equipo estuvo a un suspiro del playoff de ascenso. Melendez consolidó su rol como el engranaje del mediocampo extremeño.',
    images: ['/Merida/AleMerida1.jpg', '/Merida/AleMerida2.jpg'],
    imgPositions: ['38% 25%', '50% 25%'],
  },
  {
    id: 'ceuta',
    name: 'FC Ceuta',
    shortName: 'Ceuta',
    period: '2023 — 2024',
    seasons: '1 temporada',
    goals: 5,
    matches: 38,
    accent: '#1B6B3A',
    timelineColor: '#ffffff',
    quote: 'El playoff fue una guerra. Caímos, pero salí sabiendo que estaba listo para el siguiente nivel.',
    description: '5 goles desde el centro del campo en Primera RFEF. El equipo llegó al playoff de ascenso a Segunda División — la confirmación de que el salto era cuestión de tiempo.',
    images: ['/Ceuta/AleCeuta1.jpg', '/Ceuta/AleCeuta2.jpg'],
    imgPositions: ['50% 25%', '50% 25%'],
  },
  {
    id: 'albacete',
    name: 'Albacete Balompié',
    shortName: 'ABP',
    period: '2024 — Hoy',
    seasons: '2 temporadas',
    goals: 0,
    matches: 55,
    accent: '#C9A84C',
    timelineColor: '#ffffff',
    quote: 'El balón siempre tiene un destino mejor que el que crees. Tu trabajo es encontrarlo antes que nadie.',
    description: 'Dos permanencias solventes en Segunda División como base del mediocampo manchego. Y la Copa del Rey 2025/26 — una gesta histórica que el Carlos Belmonte jamás olvidará.',
    images: ['/Albacete/AleAlbacete1.jpg', '/Albacete/AleAlbacete2.jpg'],
    imgPositions: ['50% 50%', '50% 50%'],
  },
]
