import { ThemeProvider } from '@mui/material'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

import {
  FootprintContext,
  FootprintContextDefaultValues,
  FootprintContextType,
} from '../../hooks/use-footprint'
import { FootprintWizardProvider } from '../../hooks/use-footprint-wizard'
import { theme } from '../../styles/theme'

type CustomRenderProps = {
  footprintProviderProps?: FootprintContextType
} & RenderOptions

const customRender = (
  ui: ReactElement,
  {
    footprintProviderProps = FootprintContextDefaultValues,
    ...renderOptions
  }: CustomRenderProps = {},
) =>
  render(
    <ThemeProvider theme={theme}>
      <FootprintContext.Provider value={footprintProviderProps}>
        <FootprintWizardProvider>{ui}</FootprintWizardProvider>
      </FootprintContext.Provider>
    </ThemeProvider>,
    renderOptions,
  )

export { customRender as render }
