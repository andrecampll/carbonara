import { MockedProvider } from '@apollo/client/testing'
import { cleanup, screen } from '@testing-library/react'
import { HTMLAttributes } from 'react'
import { afterEach, describe, expect, it, vitest } from 'vitest'

import { Steps } from '@/components/wizard/steps'
import { render } from '@/utils/tests/render'

vitest.mock('next/image', () => ({
  __esModule: true,
  default: (props: HTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />
  },
}))

afterEach(cleanup)

describe('Steps', () => {
  it('should be able to render Steps component', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <Steps>
          <div>test</div>
        </Steps>
      </MockedProvider>,
    )

    expect(screen.getByText(/test/i)).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })
})
