import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { Wizard } from 'react-use-wizard'
import { afterEach, describe, expect, it } from 'vitest'

import { BaseStep } from '../../../../components/wizard/steps/base-step'

afterEach(cleanup)

describe('BaseStep', () => {
  it('should be able to render BaseStep component', () => {
    const { container } = render(
      <Wizard>
        <BaseStep
          title="Lets Calculate Your Carbon Footprint"
          description="Follow the steps to calculate your carbon footprint. We will provide
      you with a detailed report at the end. Lets get started!"
          onNextClick={() => {}}
        >
          <div>
            <p>Hello World</p>
          </div>
        </BaseStep>
      </Wizard>,
    )

    expect(screen.getByText(/Hello World/i)).toBeDefined()
    expect(
      screen.getByText(/Lets Calculate Your Carbon Footprint/i),
    ).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render BaseStep component without cancel button', () => {
    const { container } = render(
      <Wizard>
        <BaseStep
          title="Lets Calculate Your Carbon Footprint"
          description="Follow the steps to calculate your carbon footprint. We will provide
      you with a detailed report at the end. Lets get started!"
          onNextClick={() => {}}
          hideCancelButton
        >
          <div>
            <p>Hello World</p>
          </div>
        </BaseStep>
      </Wizard>,
    )

    expect(screen.queryByRole('button', { name: /back/i })).toBeNull()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render Base component and go back', async () => {
    const { container } = render(
      <Wizard>
        <BaseStep title="BaseStep title" description="BaseStep description">
          <div>BaseStep test</div>
        </BaseStep>
      </Wizard>,
    )

    const backButton = screen.getByRole('button', { name: /back/i })

    fireEvent.click(backButton)

    await waitFor(
      () => {
        expect(screen.getByText(/BaseStep test/i)).toBeDefined()
      },
      { timeout: 1000 },
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
