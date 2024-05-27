'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Footprint } from '@/data/types/footprint'

export type FootprintContextType = {
  footprint: Footprint | null
  addFootprint: (newFootprint: Footprint) => void
  clearFootprint: () => void
  footprintChartData: {
    id: number
    value: number
    label: string
    unit?: string
  }[]
}

const FootprintContext = createContext({} as FootprintContextType)

export function FootprintProvider({ children }: { children: React.ReactNode }) {
  const [footprint, setFootprint] = useState<Footprint | null>(null)

  const addFootprint = useCallback((newFootprint: Footprint) => {
    setFootprint(newFootprint)
  }, [])

  const clearFootprint = useCallback(() => {
    setFootprint(null)
  }, [])

  const footprintChartData = useMemo(() => {
    if (!footprint) return []

    return [
      {
        id: 0,
        value: footprint.yearlyElectricityEmissions?.value ?? 0,
        label: 'Electricity',
        unit: footprint.yearlyElectricityEmissions?.unit,
      },
      {
        id: 1,
        value: footprint.yearlyTransportationEmissions?.value ?? 0,
        label: 'Transportation',
        unit: footprint.yearlyTransportationEmissions?.unit,
      },
      {
        id: 2,
        value: footprint.totalAirTravelEmissions?.value ?? 0,
        label: 'Air Travel',
        unit: footprint.totalAirTravelEmissions?.unit,
      },
      {
        id: 3,
        value: footprint.dietaryChoiceEmissions?.value ?? 0,
        label: 'Dietary Choice',
        unit: footprint.dietaryChoiceEmissions?.unit,
      },
    ]
  }, [footprint])

  return (
    <FootprintContext.Provider
      value={{
        footprint,
        addFootprint,
        footprintChartData,
        clearFootprint,
      }}
    >
      {children}
    </FootprintContext.Provider>
  )
}

export const useFootprint = () => useContext(FootprintContext)
