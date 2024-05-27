import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FootprintProvider, useFootprint } from '@/hooks/use-footprint'
import { footprint } from '@/utils/tests/mocks/footprint.mock'

describe('useFootprint', () => {
  it('should return items and its info if there are any items in the cart', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FootprintProvider>{children}</FootprintProvider>
    )

    const { result } = renderHook(() => useFootprint(), {
      wrapper,
    })

    act(() => {
      result.current.addFootprint(footprint)
    })

    expect(result.current.footprint?.airTravelEmissionsLongHaul).toEqual({
      value: 400,
      unit: 'kgCO2e/year',
    })
    expect(result.current.footprint?.airTravelEmissionsMediumHaul).toEqual({
      value: 600,
      unit: 'kgCO2e/year',
    })
  })

  it('should be able to delete the footprint', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FootprintProvider>{children}</FootprintProvider>
    )

    const { result } = renderHook(() => useFootprint(), {
      wrapper,
    })

    act(() => {
      result.current.clearFootprint()
    })

    expect(result.current.footprint?.airTravelEmissionsLongHaul).toBeUndefined()
    expect(
      result.current.footprint?.airTravelEmissionsMediumHaul,
    ).toBeUndefined()
    expect(
      result.current.footprint?.airTravelEmissionsShortHaul,
    ).toBeUndefined()
  })

  it('should be able to create zeroed footprint chart data', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FootprintProvider>{children}</FootprintProvider>
    )

    const { result } = renderHook(() => useFootprint(), {
      wrapper,
    })

    act(() => {
      result.current.addFootprint({
        ...footprint,
        yearlyElectricityEmissions: null,
        yearlyTransportationEmissions: null,
        totalAirTravelEmissions: null,
        dietaryChoiceEmissions: null,
      })
    })

    const footprintDataChart = result.current.footprintChartData

    footprintDataChart.forEach((item) => {
      expect(item.value).toEqual(0)
    })
  })
})
