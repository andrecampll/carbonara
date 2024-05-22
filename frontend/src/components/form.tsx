'use client'

import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Footprint } from '@/data/types/footprint'
import { CALCULATE_FOOTPRINT_MUTATION } from '@/graphql/mutations/calculateFootprint'
import { useFootprint } from '@/hooks/use-footprint'

import { Input } from './ui/input'
import { SearchInput } from './ui/search-input'

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
    setValue,
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
          <Stack spacing={2}>
            <Input
              label="Electricity Usage (Kwh/Month):"
              type="number"
              helperText={errors.electricty?.message}
              color="secondary"
              {...register('electricty')}
            />
            <Input
              label="Transportation Gasoline Usage (Gallons/Month):"
              type="number"
              helperText={errors.transportation?.message}
              color="secondary"
              {...register('transportation')}
            />
            <Input
              label="Short Flights (4 hours):"
              type="number"
              helperText={errors.shortFlights?.message}
              color="secondary"
              {...register('shortFlights')}
            />
            <Input
              label="Medium Flights (6 hours):"
              type="number"
              helperText={errors.mediumFlights?.message}
              color="secondary"
              {...register('mediumFlights')}
            />
            <Input
              label="Long Flights (8 hours):"
              type="number"
              helperText={errors.longFlights?.message}
              color="secondary"
              {...register('longFlights')}
            />
            <SearchInput
              label="Dietary Choice:"
              helperText={errors.dietaryChoice?.message}
              color="secondary"
              onChangeValue={(value) => setValue('dietaryChoice', value)}
              {...register('dietaryChoice')}
            />
          </Stack>

          <Button
            variant="contained"
            color="secondary"
            className="mt-4"
            type="submit"
          >
            <strong>{loading ? 'Loading...' : 'Calculate'}</strong>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
