import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Input } from '../../components/ui/input'

describe('Input', () => {
  test('it should be able to render Input component', () => {
    const { container } = render(<Input />)

    expect(screen.getByRole('textbox')).toBeDefined()

    expect(container.firstChild).toMatchSnapshot()
  })
})
