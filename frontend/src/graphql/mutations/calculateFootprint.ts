import { gql } from '@apollo/client'

export const CALCULATE_FOOTPRINT_MUTATION = gql`
  mutation {
    calculate(
      input: {
        electricityUsageKWh: 100
        transportationUsageGallonsPerMonth: 50
        flightsShortHaul: 2
        flightsMediumHaul: 1
        flightsLongHaul: 0
        dietaryChoice: Vegan
      }
    ) {
      electricityEmissions {
        value
        unit
      }
      transportationEmissions {
        value
        unit
      }
      airTravelEmissionsShortHaul {
        value
        unit
      }
      airTravelEmissionsMediumHaul {
        value
        unit
      }
      airTravelEmissionsLongHaul {
        value
        unit
      }
      totalAirTravelEmissions {
        value
        unit
      }
      yearlyElectricityEmissions {
        value
        unit
      }
      yearlyTransportationEmissions {
        value
        unit
      }
      dietaryChoiceEmissions {
        value
        unit
      }
      totalYearlyEmissions {
        value
        unit
      }
    }
  }
`
