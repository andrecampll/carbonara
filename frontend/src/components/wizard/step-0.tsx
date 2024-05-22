import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useWizard } from 'react-use-wizard'

import { Step } from './step'

export function Step0() {
  const { previousStep, nextStep } = useWizard()

  return (
    <Step>
      <div className="flex flex-col gap-4">
        <header>
          <Typography variant="h5">
            Lets Calculate Your Carbon Footprint
          </Typography>
          <Typography fontWeight={400}>
            Follow the steps to calculate your carbon footprint. We will provide
            you with a detailed report at the end. Lets get started!
          </Typography>
        </header>

        <div className="my-4 flex flex-col items-center gap-4">
          <Image
            alt=""
            width={200}
            height={200}
            src="/images/carbon-light.webp"
          />
        </div>

        <footer className="flex w-full items-center justify-between">
          <Button onClick={previousStep} color="secondary" type="submit">
            Cancel
          </Button>
          <Button
            onClick={nextStep}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Next
          </Button>
        </footer>
      </div>
    </Step>
  )
}
