import { cleanup, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { afterEach, describe, expect, it, vitest } from 'vitest'

import RootLayout from '@/app/layout'
import { render } from '@/utils/tests/render'

vitest.mock('@apollo/experimental-nextjs-app-support/ssr', () => ({
  __esModule: true,
  ApolloNextAppProvider: ({ children }: { children: ReactNode }) => {
    return children
  },
}))

vitest.mock('next/font/google', () => ({
  __esModule: true,
  Inter: () => {
    return {
      subsets: ['latin'],
      variable: '--font-inter',
    }
  },
}))

afterEach(cleanup)

describe('RootLayout', () => {
  it('should be able to render RootLayout correctly', () => {
    const { container } = render(<RootLayout>Testing RootLayout</RootLayout>)

    expect(screen.getByText('Testing RootLayout'))
    expect(container.firstChild).toMatchSnapshot()
  })
})
