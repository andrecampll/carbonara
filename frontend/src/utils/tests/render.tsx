import { ThemeProvider } from '@mui/material'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

import { FootprintProvider } from '../../hooks/use-footprint'
import { FootprintWizardProvider } from '../../hooks/use-footprint-wizard'
import { theme } from '../../styles/theme'

type CustomRenderProps = RenderOptions

const customRender = (
  ui: ReactElement,
  { ...renderOptions }: CustomRenderProps = {},
) =>
  render(
    <ThemeProvider theme={theme}>
      <FootprintProvider>
        <FootprintWizardProvider>{ui}</FootprintWizardProvider>
      </FootprintProvider>
    </ThemeProvider>,
    renderOptions,
  )

export { customRender as render }
