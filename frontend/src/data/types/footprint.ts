type Emission = {
  value: number
  unit: string
}

export type Footprint = {
  electricityEmissions: Emission | null
  transportationEmissions: Emission | null
  airTravelEmissionsShortHaul: Emission | null
  airTravelEmissionsMediumHaul: Emission | null
  airTravelEmissionsLongHaul: Emission | null
  dietaryChoiceEmissions: Emission | null
  totalEmissions: Emission | null
}
