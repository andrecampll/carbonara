'use client'

import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { Wizard } from 'react-use-wizard'

import {
  CalculateFootprintMutationInput,
  Footprint,
} from '@/data/types/footprint'
import { CALCULATE_FOOTPRINT_MUTATION } from '@/graphql/mutations/calculateFootprint'
import { useFootprint } from '@/hooks/use-footprint'

import { Step0 } from './step-0'
import { Step1 } from './step-1'
import { Step2 } from './step-2'
import { Step3 } from './step-3'
import { Step4 } from './step-4'

type CalculateFootprintMutationResponse = {
  calculate: {
    footprint: Footprint
  }
}

export function Steps() {
  const { addFootprint } = useFootprint()

  const [calculateFunction] = useMutation<CalculateFootprintMutationResponse>(
    CALCULATE_FOOTPRINT_MUTATION,
  )

  const handleCalculateFootprint = useCallback(
    async (wizardData: CalculateFootprintMutationInput['input']) => {
      const { data: footPrintData } = await calculateFunction({
        variables: {
          input: wizardData,
        },
      })

      addFootprint(footPrintData?.calculate.footprint as Footprint)
    },
    [calculateFunction, addFootprint],
  )

  return (
    <Wizard>
      <Step0 />
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 onFinalSubmit={handleCalculateFootprint} />
    </Wizard>
  )
}
