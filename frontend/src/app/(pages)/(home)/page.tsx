import { Metadata } from 'next'

import { Chart } from '@/components/chart'
import { Form } from '@/components/form'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="my-6 flex w-full flex-col gap-4 lg:flex-row">
      <Form />

      <Chart />
    </div>
  )
}
