import { Card, CardContent } from '@mui/material'

import { WizardProvider } from './hooks/use-footprint-wizard'
import { Steps } from './steps'

export function FormWizard() {
  return (
    <Card>
      <CardContent>
        <WizardProvider>
          <Steps />
        </WizardProvider>
      </CardContent>
    </Card>
  )
}
