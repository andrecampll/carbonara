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

type CalculateOutput {
  electricityEmissions: Emission,
  transportationEmissions: Emission,
  airTravelEmissionsShortHaul: Emission,
  airTravelEmissionsMediumHaul: Emission,
  airTravelEmissionsLongHaul: Emission,
  totalAirTravelEmissions: Emission,
  yearlyElectricityEmissions: Emission,
  yearlyTransportationEmissions: Emission,
  dietaryChoiceEmissions: Emission,
  totalYearlyEmissions: Emission,
}

type Emission {
  value: Float
  unit: String
}
`
