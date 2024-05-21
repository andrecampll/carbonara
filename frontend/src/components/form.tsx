'use client'

import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Footprint } from '@/data/types/footprint'
import { CALCULATE_FOOTPRINT_MUTATION } from '@/graphql/mutations/calculateFootprint'
import { useFootprint } from '@/hooks/use-footprint'

import { Button } from './ui/button'
import { Input } from './ui/input'

const footprintFormSchema = z.object({
  electricty: z.string().min(1, {
    message: 'Electricity usage is required',
  }),
  transportation: z.string().min(1, {
    message: 'Transportation gasoline usage is required',
  }),
  shortFlights: z.string().min(1, {
    message: 'Short flights is required',
  }),
  mediumFlights: z.string().min(1, {
    message: 'Medium flights is required',
  }),
  longFlights: z.string().min(1, {
    message: 'Long flights is required',
  }),
  dietaryChoice: z.string().min(1, {
    message: 'Dietary choice is required',
  }),
})

type FootprintFormData = z.infer<typeof footprintFormSchema>

type CalculateFootprintMutationResponse = {
  calculate: {
    footprint: Footprint
  }
}

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FootprintFormData>({
    resolver: zodResolver(footprintFormSchema),
  })

  const { addFootprint } = useFootprint()

  const [calculateFunction, { loading }] =
    useMutation<CalculateFootprintMutationResponse>(
      CALCULATE_FOOTPRINT_MUTATION,
    )

  const handleCalculateFootprint = useCallback(
    async (formData: FootprintFormData) => {
      // handle submit
      const { data: footPrintData } = await calculateFunction({
        variables: {
          input: {
            electricityUsageKWh: Number(formData.electricty),
            transportationUsageGallonsPerMonth: Number(formData.transportation),
            flightsShortHaul: Number(formData.shortFlights),
            flightsMediumHaul: Number(formData.mediumFlights),
            flightsLongHaul: Number(formData.longFlights),
            dietaryChoice: formData.dietaryChoice,
          },
        },
      })

      addFootprint(footPrintData?.calculate.footprint as Footprint)
    },
    [calculateFunction, addFootprint],
  )

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Calculate your carbon footprint</Typography>
        <form
          onSubmit={handleSubmit(handleCalculateFootprint)}
          className="mt-4 flex w-full flex-col gap-2"
        >
          <Input
            label="Electricity Usage (Kwh/Month):"
            type="number"
            error={errors.electricty?.message}
            {...register('electricty')}
          />
          <Input
            label="Transportation Gasoline Usage (Gallons/Month):"
            type="number"
            error={errors.transportation?.message}
            {...register('transportation')}
          />
          <Input
            label="Short Flights (4 hours):"
            type="number"
            error={errors.shortFlights?.message}
            {...register('shortFlights')}
          />
          <Input
            label="Medium Flights (6 hours):"
            type="number"
            error={errors.mediumFlights?.message}
            {...register('mediumFlights')}
          />
          <Input
            label="Long Flights (8 hours):"
            type="number"
            error={errors.longFlights?.message}
            {...register('longFlights')}
          />
          <Input
            label="Dietary Choice:"
            error={errors.dietaryChoice?.message}
            {...register('dietaryChoice')}
          />

          <Button className="mt-4" type="submit">
            {loading ? 'Loading...' : 'Calculate'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
