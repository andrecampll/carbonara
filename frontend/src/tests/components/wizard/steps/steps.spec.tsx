import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { HTMLAttributes } from 'react'
import { Wizard } from 'react-use-wizard'
import { afterEach, describe, expect, it, vi, vitest } from 'vitest'

import { render } from '@/utils/tests/render'

import { Step0 } from '../../../../components/wizard/steps/step-0'
import { Step1 } from '../../../../components/wizard/steps/step-1'
import { Step2 } from '../../../../components/wizard/steps/step-2'
import { Step3 } from '../../../../components/wizard/steps/step-3'
import { Step4 } from '../../../../components/wizard/steps/step-4'

afterEach(cleanup)

vitest.mock('next/image', () => ({
  __esModule: true,
  default: (props: HTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />
  },
}))

describe('Steps0', () => {
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
})

describe('Steps1', () => {
  it('should be able to render Step1 component', () => {
    const { container } = render(
      <Wizard>
        <Step1 />
      </Wizard>,
    )

    expect(screen.getByText(/Enter your monthly electricity/i)).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to submit step 1', () => {
    const { container } = render(
      <Wizard>
        <Step1 />
      </Wizard>,
    )

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const nextButton = screen.getByRole('button', { name: /next/i })

    fireEvent.change(input, { target: { value: '123' } })
    fireEvent.click(nextButton)

    expect(input.value).toBe('123')
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('Steps2', () => {
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

  it('should be able to submit step 2', () => {
    const { container } = render(
      <Wizard>
        <Step2 />
      </Wizard>,
    )

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    const nextButton = screen.getByRole('button', { name: /next/i })

    fireEvent.change(input, { target: { value: '25' } })
    fireEvent.click(nextButton)

    expect(input.value).toBe('25')
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('Steps3', () => {
  it('should be able to render Step3 component', () => {
    const { container } = render(
      <Wizard>
        <Step3 />
      </Wizard>,
    )

    expect(screen.getByText(/Airplane Flights/i)).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to submit step 3', () => {
    const { container } = render(
      <Wizard>
        <Step3 />
      </Wizard>,
    )

    const shortFlightsInput = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: 'Short Flights (4 hours):',
    })
    const mediumFlightsInput = screen.getByRole<HTMLInputElement>(
      'spinbutton',
      {
        name: 'Medium Flights (6 hours):',
      },
    )
    const longFlightsInput = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: 'Long Flights (8 hours):',
    })
    const nextButton = screen.getByRole('button', { name: /next/i })

    fireEvent.change(shortFlightsInput, { target: { value: '5' } })
    fireEvent.change(mediumFlightsInput, { target: { value: '1' } })
    fireEvent.change(longFlightsInput, { target: { value: '0' } })
    fireEvent.click(nextButton)

    expect(shortFlightsInput.value).toBe('5')
    expect(mediumFlightsInput.value).toBe('1')
    expect(longFlightsInput.value).toBe('0')
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('Steps4', () => {
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

  it('should be able to submit step 4', async () => {
    const onSubmit = vi.fn()

    const { container } = render(
      <Wizard>
        <Step4 onFinalSubmit={onSubmit} />
      </Wizard>,
    )
    const nextButton = screen.getByRole('button', { name: /next/i })

    // open dropdown
    fireEvent.click(
      screen.getAllByRole('button', {
        name: /open/i,
      })[0],
    )
    fireEvent.click(screen.getByText('Vegan')) // select option
    fireEvent.click(nextButton) // submit

    waitFor(
      () => {
        expect(onSubmit).toHaveBeenCalledWith({
          dietaryChoice: 'Vegan',
        })
      },
      { timeout: 500 },
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
