'use client'

import { Card, CardContent, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'

import { useFootprint } from '@/hooks/use-footprint'

export function Chart() {
  const { footprintChartData } = useFootprint()

  return footprintChartData.length > 0 ? (
    <Card>
      <CardContent>
        <Typography variant="h5">Your carbon footprint</Typography>

        <div className="mt-8 flex w-full items-center">
          <PieChart
            series={[
              {
                data: footprintChartData,
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

      <CardContent>
        <ul className="mt-4">
          {footprintChartData.map((data) => (
            <li key={data.id} className="flex justify-between">
              <Typography fontWeight="600">{data.label}</Typography>
              <Typography>
                {data.value.toFixed(2)} <strong>{data.unit || 'kg'}</strong>
              </Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  ) : null
}
