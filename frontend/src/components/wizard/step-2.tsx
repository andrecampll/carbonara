import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'

import { Input } from '../ui/input'
import { useFootprintWizard } from './hooks/use-footprint-wizard'
import { Step } from './step'

const footprintStep2Schema = z.object({
  transportationUsage: z.string().min(1, {
    message: 'Transportation gasoline usage is required',
  }),
})

type FootprintWizardFormStep2Data = z.infer<typeof footprintStep2Schema>

export function Step2() {
  const { previousStep, nextStep } = useWizard()
  const { updateWizard, wizard } = useFootprintWizard()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FootprintWizardFormStep2Data>({
    resolver: zodResolver(footprintStep2Schema),
    defaultValues: {
      transportationUsage: wizard?.transportationUsage?.toString() ?? '',
    },
  })

  const onSubmit = useCallback(
    async (formData: FootprintWizardFormStep2Data) => {
      updateWizard({
        transportationUsage: Number(formData.transportationUsage),
      })
      nextStep()
    },
    [nextStep, updateWizard],
  )

  return (
    <Step>
      <div className="flex flex-col gap-4">
        <header>
          <Typography variant="h5">Transportation Gasoline Usage</Typography>
          <Typography fontWeight={400}>
            Enter your monthly transportation gasoline usage in gallons to
            calculate your carbon footprint.
          </Typography>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-4 flex flex-col items-center gap-4"
        >
          <Image alt="" width={300} height={300} src="/images/gas.png" />

          <Input
            label="Transportation Gasoline Usage (Gallons/Month):"
            type="number"
            helperText={errors.transportationUsage?.message}
            {...register('transportationUsage')}
          />

          <footer className="flex w-full items-center justify-between">
            <Button onClick={previousStep} color="secondary">
              Back
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Next
            </Button>
          </footer>
        </form>
      </div>
    </Step>
  )
}
