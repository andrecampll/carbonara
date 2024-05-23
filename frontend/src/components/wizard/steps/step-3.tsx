import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { useFootprintWizard } from '@/hooks/use-footprint-wizard'

import { BaseStep } from './base-step'

const footprintStep3Schema = z.object({
  shortFlights: z.string().min(1, {
    message: 'Short flights is required',
  }),
  mediumFlights: z.string().min(1, {
    message: 'Medium flights is required',
  }),
  longFlights: z.string().min(1, {
    message: 'Long flights is required',
  }),
})

type FootprintWizardFormStep3Data = z.infer<typeof footprintStep3Schema>

export function Step3() {
  const { nextStep } = useWizard()
  const { updateWizard, wizard } = useFootprintWizard()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FootprintWizardFormStep3Data>({
    resolver: zodResolver(footprintStep3Schema),
    defaultValues: {
      shortFlights: wizard?.shortFlights?.toString() ?? '',
      mediumFlights: wizard?.mediumFlights?.toString() ?? '',
      longFlights: wizard?.longFlights?.toString() ?? '',
    },
  })

  const onSubmit = useCallback(
    async (formData: FootprintWizardFormStep3Data) => {
      // handle submit
      updateWizard({
        shortFlights: Number(formData.shortFlights),
        mediumFlights: Number(formData.mediumFlights),
        longFlights: Number(formData.longFlights),
      })
      nextStep()
    },
    [nextStep, updateWizard],
  )

  return (
    <BaseStep
      title="Airplane Flights"
      description="Enter how many short, medium, and long flights you take per year to
      calculate your carbon footprint."
      nextButtonFormId="airplane-flights-form"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-center gap-4"
        id="airplane-flights-form"
      >
        <Image alt="" width={300} height={300} src="/images/airplane.webp" />

        <Input
          label="Short Flights (4 hours):"
          type="number"
          helperText={errors.shortFlights?.message}
          {...register('shortFlights')}
        />
        <Input
          label="Medium Flights (6 hours):"
          type="number"
          helperText={errors.mediumFlights?.message}
          {...register('mediumFlights')}
        />
        <Input
          label="Long Flights (8 hours):"
          type="number"
          helperText={errors.longFlights?.message}
          {...register('longFlights')}
        />
      </form>
    </BaseStep>
  )
}
