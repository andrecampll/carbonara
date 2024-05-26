'use client'

import { createContext, useCallback, useContext, useState } from 'react'

export type FootprintWizard = {
  electrictyUsage: number
  transportationUsage: number
  shortFlights: number
  mediumFlights: number
  longFlights: number
  dietaryChoice: 'Vegan' | 'Vegetarian' | 'MeatEater' | 'Pescatarian'
}

type FootprintWizardContextType = {
  wizard: FootprintWizard | null
  updateWizard: (newWizardData: Partial<FootprintWizard>) => void
  clearWizard: () => void
}

const FootprintWizardContext = createContext({} as FootprintWizardContextType)

export function FootprintWizardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [wizard, setWizard] = useState<FootprintWizard>({} as FootprintWizard)

  const updateWizard = useCallback(
    (newWizardData: Partial<FootprintWizard>) => {
      setWizard((prevWizard) => ({
        ...prevWizard,
        ...newWizardData,
      }))
    },
    [],
  )

  const clearWizard = useCallback(() => {
    setWizard({} as FootprintWizard)
  }, [])

  return (
    <FootprintWizardContext.Provider
      value={{
        wizard,
        updateWizard,
        clearWizard,
      }}
    >
      {children}
    </FootprintWizardContext.Provider>
  )
}

export const useFootprintWizard = () => useContext(FootprintWizardContext)
