type Emission = {
  value: number
  unit: string
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
