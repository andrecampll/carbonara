import { MockedProvider } from '@apollo/client/testing'
import { cleanup, screen } from '@testing-library/react'
import { HTMLAttributes } from 'react'
import { afterEach, describe, expect, it, vitest } from 'vitest'

import { FootprintWizard } from '@/components/wizard/footprint-wizard'
// import { CALCULATE_FOOTPRINT_MUTATION } from '@/graphql/mutations/calculateFootprint'
import { render } from '@/utils/tests/render'

vitest.mock('next/image', () => ({
  __esModule: true,
  default: (props: HTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />
  },
}))

afterEach(cleanup)

describe('FootprintWizard', () => {
  it('should be able to render FootprintWizard component', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <FootprintWizard />
      </MockedProvider>,
    )

    expect(
      screen.getByText(/Lets Calculate Your Carbon Footprint/i),
    ).toBeDefined()
    expect(
      screen.getByText(
        /Follow the steps to calculate your carbon footprint. We will provide you with a detailed report at the end. Lets get started/i,
      ),
    ).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })
})
