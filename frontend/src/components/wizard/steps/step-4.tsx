import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SearchInput } from '@/components/ui/search-input'
import { CalculateFootprintMutationInput } from '@/data/types/footprint'
import {
  FootprintWizard,
  useFootprintWizard,
} from '@/hooks/use-footprint-wizard'

import { BaseStep } from './base-step'

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
    <BaseStep
      title="Dietary Choice"
      description="Select your dietary choice to calculate your carbon footprint."
      nextButtonFormId="dietary-choice-form"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-center gap-4"
        id="dietary-choice-form"
      >
        <Image alt="" width={300} height={300} src="/images/meat.png" />

        <SearchInput
          label="Dietary Choice:"
          helperText={errors.dietaryChoice?.message}
          {...register('dietaryChoice')}
          onChangeValue={(value) => {
            setValue('dietaryChoice', value)
          }}
        />
      </form>
    </BaseStep>
  )
}
