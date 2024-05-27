import { MockedProvider } from '@apollo/client/testing'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Chart } from '@/app/(pages)/(home)/components/chart'
import {
  FootprintContextDefaultValues,
  FootprintContextType,
} from '@/hooks/use-footprint'
import {
  footprint,
  footprintChartData,
} from '@/utils/tests/mocks/footprint.mock'
import { render } from '@/utils/tests/render'

afterEach(cleanup)

describe('Chart', () => {
  it('should be able to render Chart component', () => {
    const footprintProviderProps: FootprintContextType = {
      ...FootprintContextDefaultValues,
      footprint,
      footprintChartData,
    }

    const { container } = render(
      <MockedProvider addTypename={false}>
        <Chart />
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

  it('should be able to render Chart without unit', () => {
    const footprintProviderProps: FootprintContextType = {
      ...FootprintContextDefaultValues,
      footprint: {
        ...footprint,
        totalYearlyEmissions: {
          value: 0,
          unit: null,
        },
      },
      footprintChartData,
    }

    const { container } = render(
      <MockedProvider addTypename={false}>
        <Chart />
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

  it('should not be able to render Chart component without footprint', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <Chart />
      </MockedProvider>,
    )

    expect(
      screen.queryByRole('heading', {
        name: /Your carbon footprint/i,
      }),
    ).toBeNull()
    expect(container.firstChild).toMatchSnapshot()
  })
})
