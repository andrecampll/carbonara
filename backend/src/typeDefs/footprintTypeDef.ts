export const footprintTypeDef = `#graphql

type Mutation {
  calculate(input: CalculateInput): CalculateOutput
}

type Query {
  footprint: String
}

enum DietaryChoiceEnum {
  Vegan
  Vegetarian
  Pescatarian
  MeatEater
}

input CalculateInput {
  electricityUsageKWh: Float
  transportationUsageGallonsPerMonth: Float
  flightsShortHaul: Float
  flightsMediumHaul: Float
  flightsLongHaul: Float
  dietaryChoice: DietaryChoiceEnum
}

type Footprint {
  electricityEmissions: Emission
  transportationEmissions: Emission
  airTravelEmissionsShortHaul: Emission
  airTravelEmissionsMediumHaul: Emission
  airTravelEmissionsLongHaul: Emission
  dietaryEmissions: Emission
  totalEmissions: Emission
}

type CalculateOutput {
  footprint: Footprint
}

type Emission {
  value: Float
  unit: String
}
`
