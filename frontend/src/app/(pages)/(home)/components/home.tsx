'use client'

import { FormWizard } from '@/components/wizard/form-wizard'
import { useFootprint } from '@/hooks/use-footprint'

import { Chart } from './chart'

export function Home() {
  const { footprint } = useFootprint()

  return (
    <div className="my-6 flex w-full">
      {!footprint ? <FormWizard /> : <Chart />}
    </div>
  )
}
