import { Input as _Input } from '@mui/base/Input'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

type InputProps = {
  icon?: ReactNode
  label?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm" htmlFor={id}>
            {label}
          </label>
        )}

        <_Input
          slotProps={{
            input: {
              className:
                'w-full text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0',
            },
          }}
          ref={ref}
          {...props}
        />

        <div>
          {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'
