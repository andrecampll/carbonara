'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Footprint } from '@/data/types/footprint'

type FootprintContextType = {
  footprint: Footprint | null
  addFootprint: (newFootprint: Footprint) => void
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

  const footprintChartData = useMemo(() => {
    if (!footprint) return []

    const totalAirTravelEmissions =
      (footprint.airTravelEmissionsShortHaul?.value ?? 0) +
      (footprint.airTravelEmissionsMediumHaul?.value ?? 0) +
      (footprint.airTravelEmissionsLongHaul?.value ?? 0)

    return [
      {
        id: 0,
        value: footprint.electricityEmissions?.value ?? 0,
        label: 'Electricity',
        unit: footprint.electricityEmissions?.unit,
      },
      {
        id: 1,
        value: footprint.transportationEmissions?.value ?? 0,
        label: 'Transportation',
        unit: footprint.transportationEmissions?.unit,
      },
      {
        id: 2,
        value: totalAirTravelEmissions,
        label: 'Air Travel',
        unit: footprint.airTravelEmissionsShortHaul?.unit,
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
      }}
    >
      {children}
    </FootprintContext.Provider>
  )
}

export const useFootprint = () => useContext(FootprintContext)
