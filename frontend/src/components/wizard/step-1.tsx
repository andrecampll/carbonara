import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'

import { Input } from '../ui/input'
import { useFootprintWizard } from './hooks/use-footprint-wizard'

const footprintStep1Schema = z.object({
  electrictyUsage: z.string().min(1, {
    message: 'Electricity usage is required',
  }),
})

type FootprintWizardFormStep1Data = z.infer<typeof footprintStep1Schema>

export function Step1() {
  const { previousStep, nextStep } = useWizard()
  const { updateWizard, wizard } = useFootprintWizard()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FootprintWizardFormStep1Data>({
    resolver: zodResolver(footprintStep1Schema),
    defaultValues: {
      electrictyUsage: wizard?.electrictyUsage?.toString() ?? '',
    },
  })

  const onSubmit = useCallback(
    async (formData: FootprintWizardFormStep1Data) => {
      // handle submit
      updateWizard({
        electrictyUsage: Number(formData.electrictyUsage),
      })
      nextStep()
    },
    [nextStep, updateWizard],
  )

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Typography variant="h5">Electricity Usage</Typography>
        <Typography fontWeight={400}>
          Enter your monthly electricity usage in kilowatt hours (Kwh) to
          calculate your carbon footprint.
        </Typography>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-center gap-4"
      >
        <Image alt="" width={300} height={300} src="/images/electricity.webp" />

        <Input
          label="Electricity Usage (Kwh/Month):"
          type="number"
          helperText={errors.electrictyUsage?.message}
          color="secondary"
          {...register('electrictyUsage')}
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
  )
}
