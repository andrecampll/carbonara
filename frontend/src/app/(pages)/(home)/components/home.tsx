'use client'

import { Chart } from '@/components/chart'
import { FormWizard } from '@/components/wizard/form-wizard'
import { useFootprint } from '@/hooks/use-footprint'

export function Home() {
  const { footprint } = useFootprint()

  return (
    <div className="my-6 flex w-full flex-col gap-4 lg:flex-row">
      {!footprint ? <FormWizard /> : <Chart />}
    </div>
  )
}
