import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { SearchInput } from '../../components/ui/search-input'

afterEach(cleanup)

describe('SearchInput', () => {
  test('it should be able to render SearchInput component', () => {
    const onChangeValue = () => {}

    const { container } = render(<SearchInput onChangeValue={onChangeValue} />)

    expect(screen.getByRole('combobox')).toBeDefined()
    expect(screen.getByRole('button')).toHaveProperty('title', 'Open')

    expect(container.firstChild).toMatchSnapshot()
  })

  test('it should be able click and expand Search Input', () => {
    const onChangeValue = vi.fn()

    const { container } = render(<SearchInput onChangeValue={onChangeValue} />)

    fireEvent.click(
      screen.getAllByRole('button', {
        name: /open/i,
      })[0],
    )

    const option = screen.getByText(/vegan/i)

    expect(option).toBeDefined()

    fireEvent.click(option)

    expect(container.firstChild).toMatchSnapshot()
  })
})
