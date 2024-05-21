import { Button as BaseButton, ButtonProps } from '@mui/base/Button'
import clsx from 'clsx'
import * as React from 'react'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...other } = props
    return (
      <BaseButton
        ref={ref}
        className={clsx(
          'ui-disabled:text-slate-700 ui-disabled:dark:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:dark:bg-slate-700 ui-disabled:cursor-default ui-disabled:shadow-none ui-disabled:dark:shadow-none ui-disabled:hover:bg-slate-200 ui-disabled:hover:dark:bg-slate-700 ui-disabled:border-none hover:bg-secondary-600 active:bg-secondary-700 cursor-pointer rounded-lg border border-solid border-secondary-500 bg-secondary-500 px-4 py-2 font-sans text-sm font-semibold leading-normal text-white transition focus-visible:outline-none active:scale-[0.99] active:shadow-none',
          className,
        )}
        {...other}
      />
    )
  },
)

Button.displayName = 'Button'
