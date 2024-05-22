import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'

import { CalculateFootprintMutationInput } from '@/data/types/footprint'

import { SearchInput } from '../ui/search-input'
import {
  FootprintWizard,
  useFootprintWizard,
} from './hooks/use-footprint-wizard'

const footprintStep4Schema = z.object({
  dietaryChoice: z.string().min(1, {
    message: 'Dietary choice is required',
  }),
})

type FootprintWizardFormStep4Data = z.infer<typeof footprintStep4Schema>

type Props = {
  onFinalSubmit: (
    wizardData: CalculateFootprintMutationInput['input'],
  ) => Promise<void>
}

export function Step4({ onFinalSubmit }: Props) {
  const { previousStep } = useWizard()
  const { updateWizard, wizard, clearWizard } = useFootprintWizard()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FootprintWizardFormStep4Data>({
    resolver: zodResolver(footprintStep4Schema),
    defaultValues: {
      dietaryChoice: wizard?.dietaryChoice?.toString() ?? '',
    },
  })

  const onSubmit = useCallback(
    async (formData: FootprintWizardFormStep4Data) => {
      console.log('formData', formData)
      const dietaryChoice =
        formData.dietaryChoice as FootprintWizard['dietaryChoice']

      updateWizard({
        dietaryChoice,
      })

      await onFinalSubmit({
        electricityUsageKWh: Number(wizard?.electrictyUsage),
        transportationUsageGallonsPerMonth: Number(wizard?.transportationUsage),
        flightsShortHaul: Number(wizard?.shortFlights),
        flightsMediumHaul: Number(wizard?.mediumFlights),
        flightsLongHaul: Number(wizard?.longFlights),
        dietaryChoice,
      })

      clearWizard()
    },
    [updateWizard, onFinalSubmit, wizard, clearWizard],
  )

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Typography variant="h5">Dietary Choice</Typography>
        <Typography fontWeight={400}>
          Select your dietary choice to calculate your carbon footprint.
        </Typography>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-center gap-4"
      >
        <Image alt="" width={300} height={300} src="/images/meat.png" />

        <SearchInput
          label="Dietary Choice:"
          helperText={errors.dietaryChoice?.message}
          {...register('dietaryChoice')}
          onChangeValue={(value) => {
            console.log('valueeee', value)
            setValue('dietaryChoice', value)
          }}
        />

        <footer className="flex w-full items-center justify-between">
          <Button onClick={previousStep} color="secondary">
            Back
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </footer>
      </form>
    </div>
  )
}
