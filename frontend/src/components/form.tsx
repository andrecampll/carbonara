'use client'

import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CALCULATE_FOOTPRINT_MUTATION } from '@/graphql/mutations/calculateFootprint'

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

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FootprintFormData>({
    resolver: zodResolver(footprintFormSchema),
  })

  const [calculateFunction, { data, loading }] = useMutation(
    CALCULATE_FOOTPRINT_MUTATION,
  )

  const handleCalculateFootprint = useCallback(
    (data: FootprintFormData) => {
      // handle submit
      console.log('submit', data)

      calculateFunction({
        variables: {
          input: {
            electricityUsageKWh: Number(data.electricty),
            transportationUsageGallonsPerMonth: Number(data.transportation),
            flightsShortHaul: Number(data.shortFlights),
            flightsMediumHaul: Number(data.mediumFlights),
            flightsLongHaul: Number(data.longFlights),
            dietaryChoice: data.dietaryChoice,
          },
        },
      })
    },
    [calculateFunction],
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
            {isSubmitting ? 'Loading...' : 'Calculate'}
          </Button>

          {loading ? <p>Loading...</p> : <p>{data?.footprint}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
