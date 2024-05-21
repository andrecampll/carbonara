type Emission = {
  value: number
  unit: string
}

export type Footprint = {
  electricityEmissions: Emission
  transportationEmissions: Emission
  airTravelEmissionsShortHaul: Emission
  airTravelEmissionsMediumHaul: Emission
  airTravelEmissionsLongHaul: Emission
  totalAirTravelEmissions: Emission
  yearlyElectricityEmissions: Emission
  yearlyTransportationEmissions: Emission
  dietaryChoiceEmissions: Emission
  totalYearlyEmissions: Emission
}
