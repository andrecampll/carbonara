import { cleanup, render, screen } from '@testing-library/react'
import { Wizard } from 'react-use-wizard'
import { afterEach, describe, expect, it } from 'vitest'

import { Step0 } from '../../../../components/wizard/steps/step-0'
import { Step1 } from '../../../../components/wizard/steps/step-1'
import { Step2 } from '../../../../components/wizard/steps/step-2'
import { Step3 } from '../../../../components/wizard/steps/step-3'
import { Step4 } from '../../../../components/wizard/steps/step-4'

afterEach(cleanup)

describe('Steps', () => {
  it('should be able to render Step0 component', () => {
    const { container } = render(
      <Wizard>
        <Step0 />
      </Wizard>,
    )

    expect(
      screen.getByText(/Lets Calculate Your Carbon Footprint/i),
    ).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render Step1 component', () => {
    const { container } = render(
      <Wizard>
        <Step1 />
      </Wizard>,
    )

    expect(screen.getByText(/Enter your monthly electricity/i)).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render Step2 component', () => {
    const { container } = render(
      <Wizard>
        <Step2 />
      </Wizard>,
    )

    expect(
      screen.getByText(/Enter your monthly transportation gasoline usage/i),
    ).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render Step3 component', () => {
    const { container } = render(
      <Wizard>
        <Step3 />
      </Wizard>,
    )

    expect(screen.getByText(/Airplane Flights/i)).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render Step4 component', () => {
    const { container } = render(
      <Wizard>
        <Step4 onFinalSubmit={async () => {}} />
      </Wizard>,
    )

    expect(
      screen.getByText(
        /Select your dietary choice to calculate your carbon footprint/i,
      ),
    ).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })
})
