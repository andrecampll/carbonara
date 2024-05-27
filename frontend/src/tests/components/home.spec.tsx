import { MockedProvider } from '@apollo/client/testing'
import { cleanup, screen } from '@testing-library/react'
import { HTMLAttributes } from 'react'
import { afterEach, describe, expect, it, vitest } from 'vitest'

import { Home } from '@/app/(pages)/(home)/components/home'
import {
  FootprintContextDefaultValues,
  FootprintContextType,
} from '@/hooks/use-footprint'
import {
  footprint,
  footprintChartData,
} from '@/utils/tests/mocks/footprint.mock'
import { render } from '@/utils/tests/render'

vitest.mock('next/image', () => ({
  __esModule: true,
  default: (props: HTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />
  },
}))

afterEach(cleanup)

describe('Home', () => {
  it('should be able to render Home component with FootprintWizard component', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <Home />
      </MockedProvider>,
    )

    expect(
      screen.getByRole('heading', {
        name: /Lets Calculate Your Carbon Footprint/i,
      }),
    ).toBeDefined()
    expect(
      screen.getByText(
        'Follow the steps to calculate your carbon footprint. We will provide you with a detailed report at the end. Lets get started!',
      ),
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be able to render Home component with Chart component', () => {
    const footprintProviderProps: FootprintContextType = {
      ...FootprintContextDefaultValues,
      footprint,
      footprintChartData,
    }

    const { container } = render(
      <MockedProvider addTypename={false}>
        <Home />
      </MockedProvider>,
      {
        footprintProviderProps,
      },
    )

    expect(
      screen.getByRole('heading', {
        name: /Your carbon footprint/i,
      }),
    ).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })
})
