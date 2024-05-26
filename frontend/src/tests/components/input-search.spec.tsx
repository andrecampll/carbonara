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

    const { container } = render(
      <SearchInput onChangeValue={onChangeValue} label="Dietary Choice:" />,
    )
    const input = screen.getByRole<HTMLInputElement>('combobox', {
      name: 'Dietary Choice:',
    })

    fireEvent.click(
      screen.getAllByRole('button', {
        name: /open/i,
      })[0],
    )
    fireEvent.click(screen.getByText('Vegan')) // select option

    expect(input.value).toBe('Vegan')
    expect(container.firstChild).toMatchSnapshot()
  })
})
