import { Autocomplete } from '@mui/material'
import { forwardRef } from 'react'

import { Input, InputProps } from './input'

type Props = InputProps & {
  onChangeValue: (value: string) => void
}

export const SearchInput = forwardRef<HTMLDivElement, Props>(
  ({ label, helperText, onChangeValue }, ref) => {
    const dietaryChoices = [
      {
        value: 'Vegan',
        label: 'Vegan',
      },
      {
        value: 'Vegetarian',
        label: 'Vegetarian',
      },
      {
        value: 'Pescatarian',
        label: 'Pescatarian',
      },
      {
        value: 'MeatEater',
        label: 'Meat Eater',
      },
    ]

    return (
      <div>
        <Autocomplete
          options={dietaryChoices}
          renderInput={(params) => (
            <Input {...params} label={label} helperText={helperText} />
          )}
          onChange={(_, option) => option && onChangeValue(option.value)}
          ref={ref}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
