'use client'
import { create } from 'zustand'
import { TEAMS } from './teams'

interface TeamStore {
  activeIdx: number
  setActiveIdx: (idx: number) => void
}

export const useTeamStore = create<TeamStore>((set) => ({
  activeIdx: 0,
  setActiveIdx: (idx) => {
    const team = TEAMS[idx]
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent', team.accent)
    }
    set({ activeIdx: idx })
  },
}))
