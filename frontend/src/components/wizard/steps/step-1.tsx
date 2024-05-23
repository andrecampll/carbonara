import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { useFootprintWizard } from '@/hooks/use-footprint-wizard'

import { BaseStep } from './base-step'

const footprintStep1Schema = z.object({
  electrictyUsage: z.string().min(1, {
    message: 'Electricity usage is required',
  }),
})

type FootprintWizardFormStep1Data = z.infer<typeof footprintStep1Schema>

export function Step1() {
  const { nextStep } = useWizard()
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
    <BaseStep
      title="Electricity Usage"
      description="Enter your monthly electricity usage in kilowatt hours (Kwh) to
      calculate your carbon footprint."
      nextButtonFormId="electricity-usage-form"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 flex flex-col items-center gap-4"
        id="electricity-usage-form"
      >
        <Image alt="" width={300} height={300} src="/images/electricity.webp" />

        <Input
          label="Electricity Usage (Kwh/Month):"
          type="number"
          helperText={errors.electrictyUsage?.message}
          {...register('electrictyUsage')}
        />
      </form>
    </BaseStep>
  )
}
