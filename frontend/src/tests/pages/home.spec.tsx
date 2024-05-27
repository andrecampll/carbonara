import { MockedProvider } from '@apollo/client/testing'
import { cleanup, screen } from '@testing-library/react'
import { HTMLAttributes } from 'react'
import { afterEach, describe, expect, it, vitest } from 'vitest'

import HomePage from '@/app/(pages)/(home)/page'
import { render } from '@/utils/tests/render'

vitest.mock('next/image', () => ({
  __esModule: true,
  default: (props: HTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />
  },
}))

afterEach(cleanup)

describe('HomePage', () => {
  it('should be able to render Home page correctly', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <HomePage />
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
})
