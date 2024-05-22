'use client'

import { Card, CardContent, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'

import { useFootprint } from '@/hooks/use-footprint'

export function Chart() {
  const { footprintChartData, footprint } = useFootprint()

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

              <span className="flex items-center gap-2">
                <Typography fontSize={20}>{data.value.toFixed(2)}</Typography>

                <strong>{data.unit || 'kg'}</strong>
              </span>
            </li>
          ))}

          <li className="flex justify-between">
            <Typography fontWeight="600">Total Emissions</Typography>

            <span className="flex items-center gap-2">
              <Typography fontSize={20}>
                {footprint?.totalYearlyEmissions?.value.toFixed(2)}
              </Typography>

              <strong>{footprint?.totalYearlyEmissions?.unit || 'kg'}</strong>
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  ) : null
}
