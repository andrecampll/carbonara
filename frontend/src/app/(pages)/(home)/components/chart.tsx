'use client'

import { Button, Card, CardContent, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'

import { useFootprint } from '@/hooks/use-footprint'

export function Chart() {
  const { footprintChartData, footprint, clearFootprint } = useFootprint()

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
        <Typography variant="h6">Carbon Footprint Breakdown</Typography>

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

      <CardContent>
        <Typography>
          Your carbon footprint is calculated based on the data you provided.
          The data is calculated using the latest carbon footprint calculation
          methods and is an estimate. The data is not 100% accurate and should
          be used as a reference only.
        </Typography>{' '}
        <br />
        <Typography>
          You can test different scenarios by changing the data you provided and
          see how it affects your carbon footprint. You can also see how
          different choices can help you reduce your carbon footprint.
        </Typography>
      </CardContent>

      <CardContent className="flex w-full justify-center">
        <Button onClick={clearFootprint} variant="contained" color="secondary">
          Try again with different values
        </Button>
      </CardContent>
    </Card>
  ) : null
}
