import { Footprint } from '@/data/types/footprint'

export const footprint: Footprint = {
  yearlyElectricityEmissions: {
    value: 100,
    unit: 'kgCO2e/year',
  },
  yearlyTransportationEmissions: {
    value: 200,
    unit: 'kgCO2e/year',
  },
  totalAirTravelEmissions: {
    value: 300,
    unit: 'kgCO2e/year',
  },
  airTravelEmissionsLongHaul: {
    value: 400,
    unit: 'kgCO2e/year',
  },
  airTravelEmissionsShortHaul: {
    value: 500,
    unit: 'kgCO2e/year',
  },
  airTravelEmissionsMediumHaul: {
    value: 600,
    unit: 'kgCO2e/year',
  },
  transportationEmissions: {
    value: 700,
    unit: 'kgCO2e',
  },
  electricityEmissions: {
    value: 800,
    unit: 'kgCO2e',
  },
  dietaryChoiceEmissions: {
    value: 900,
    unit: 'kgCO2e/year',
  },
  totalYearlyEmissions: {
    value: 1000,
    unit: 'kgCO2e/year',
  },
}
