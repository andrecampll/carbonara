'use client'

import { createContext, useCallback, useContext, useState } from 'react'

import { Footprint } from '@/data/types/footprint'

type FootprintContextType = {
  footprint: Footprint | null
  addFootprint: (newFootprint: Footprint) => void
}

const FootprintContext = createContext({} as FootprintContextType)

export function FootprintProvider({ children }: { children: React.ReactNode }) {
  const [footprint, setFootprint] = useState<Footprint | null>(null)

  const addFootprint = useCallback((newFootprint: Footprint) => {
    setFootprint(newFootprint)
  }, [])

  return (
    <FootprintContext.Provider
      value={{
        footprint,
        addFootprint,
      }}
    >
      {children}
    </FootprintContext.Provider>
  )
}

export const useFootprint = () => useContext(FootprintContext)
