import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Header } from '../../components/header'

describe('Header', () => {
  test('it should be able to render Header component', () => {
    const { container } = render(<Header />)

    expect(screen.getByText(/john doe/i)).toBeDefined()
    expect(container.firstChild).toMatchSnapshot()
  })
})
