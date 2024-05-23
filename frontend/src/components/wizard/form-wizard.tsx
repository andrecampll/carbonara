import { Card, CardContent } from '@mui/material'

import { WizardProvider } from '@/hooks/use-footprint-wizard'

import { Steps } from './steps'

export function FormWizard() {
  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <WizardProvider>
            <Steps />
          </WizardProvider>
        </CardContent>
      </Card>
    </div>
  )
}
