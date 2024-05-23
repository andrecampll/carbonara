import Image from 'next/image'
import { useWizard } from 'react-use-wizard'

import { BaseStep } from './base-step'

export function Step0() {
  const { nextStep } = useWizard()

  return (
    <BaseStep
      title="Lets Calculate Your Carbon Footprint"
      description="Follow the steps to calculate your carbon footprint. We will provide
      you with a detailed report at the end. Lets get started!"
      hideCancelButton
      onNextClick={nextStep}
    >
      <div className="my-4 flex flex-col items-center gap-4">
        <Image
          alt=""
          width={200}
          height={200}
          src="/images/carbon-light.webp"
        />
      </div>
    </BaseStep>
  )
}
