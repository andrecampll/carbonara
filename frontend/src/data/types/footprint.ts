type Emission = {
  value: number
  unit?: string | null
}

export type Footprint = {
  electricityEmissions: Emission | null
  transportationEmissions: Emission | null
  yearlyElectricityEmissions: Emission | null
  yearlyTransportationEmissions: Emission | null
  airTravelEmissionsShortHaul: Emission | null
  airTravelEmissionsMediumHaul: Emission | null
  airTravelEmissionsLongHaul: Emission | null
  dietaryChoiceEmissions: Emission | null
  totalYearlyEmissions: Emission | null
  totalAirTravelEmissions: Emission | null
}

export type CalculateFootprintMutationOutput = {
  calculate: {
    footprint: Footprint
  }
}

export type CalculateFootprintMutationInput = {
  input: {
    electricityUsageKWh: number
    transportationUsageGallonsPerMonth: number
    flightsShortHaul: number
    flightsMediumHaul: number
    flightsLongHaul: number
    dietaryChoice: string
  }
}
