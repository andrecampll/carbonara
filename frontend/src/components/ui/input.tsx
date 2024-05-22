import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

export type InputProps = TextFieldProps

export const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <TextField fullWidth {...props} error={!!props.helperText} ref={ref} />
    )
  },
)

Input.displayName = 'Input'
