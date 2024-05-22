'use client'

import { ThemeProvider } from '@mui/material'

import { theme } from './theme'

export const CustomThemeProvider = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
