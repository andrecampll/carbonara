import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { useFootprintWizard } from '@/hooks/use-footprint-wizard'

import { BaseStep } from './base-step'

const footprintStep2Schema = z.object({
  transportationUsage: z.string().min(1, {
    message: 'Transportation gasoline usage is required',
  }),
})

type FootprintWizardFormStep2Data = z.infer<typeof footprintStep2Schema>

export function Step2() {
  const { nextStep } = useWizard()
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
    <BaseStep
      title="Transportation Gasoline Usage"
      description="Enter your monthly transportation gasoline usage in gallons to
      calculate your carbon footprint."
      nextButtonFormId="transportation-usage-form"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-center gap-4"
        id="transportation-usage-form"
      >
        <Image alt="" width={300} height={300} src="/images/gas.png" />

        <Input
          label="Transportation Gasoline Usage (Gallons/Month):"
          type="number"
          helperText={errors.transportationUsage?.message}
          {...register('transportationUsage')}
        />
      </form>
    </BaseStep>
  )
}
