'use client'

import { Card, CardContent, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'

export function Chart() {
  const data = [
    { id: 0, value: 10, label: 'Electricity' },
    { id: 1, value: 15, label: 'Transportation' },
    { id: 2, value: 20, label: 'Air Travel' },
    { id: 3, value: 40, label: 'Dietary Choice' },
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Your carbon footprint</Typography>

        <div className="mt-8 flex w-full items-center">
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}
            width={600}
            height={300}
            colors={['#007EA7', '#1DD1A0', '#9F7E69', '#FFCAE9']}
          />
        </div>
      </CardContent>
    </Card>
  )
}
