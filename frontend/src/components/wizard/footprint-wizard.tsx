import { useMutation } from '@apollo/client'
import { Card, CardContent } from '@mui/material'
import { useCallback } from 'react'

import {
  CalculateFootprintMutationInput,
  Footprint,
} from '@/data/types/footprint'
import { CALCULATE_FOOTPRINT_MUTATION } from '@/graphql/mutations/calculateFootprint'
import { useFootprint } from '@/hooks/use-footprint'
import { FootprintWizardProvider } from '@/hooks/use-footprint-wizard'

import { Steps } from './steps'
import { Step0 } from './steps/step-0'
import { Step1 } from './steps/step-1'
import { Step2 } from './steps/step-2'
import { Step3 } from './steps/step-3'
import { Step4 } from './steps/step-4'

type CalculateFootprintMutationResponse = {
  calculate: {
    footprint: Footprint
  }
}

type Props = {
  startIndex?: number
}

export function FootprintWizard({ startIndex }: Props) {
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
    <div className="w-full">
      <Card>
        <CardContent>
          <FootprintWizardProvider>
            <Steps startIndex={startIndex}>
              <Step0 />
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 onFinalSubmit={handleCalculateFootprint} />
            </Steps>
          </FootprintWizardProvider>
        </CardContent>
      </Card>
    </div>
  )
}
