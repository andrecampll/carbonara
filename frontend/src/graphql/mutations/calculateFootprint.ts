import { gql } from '@apollo/client'

export const CALCULATE_FOOTPRINT_MUTATION = gql`
  fragment EmissionFragment on Emission {
    unit
    value
  }

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
      footprint {
        electricityEmissions {
          ...EmissionFragment
        }

        transportationEmissions {
          ...EmissionFragment
        }

        airTravelEmissionsShortHaul {
          ...EmissionFragment
        }

        airTravelEmissionsMediumHaul {
          ...EmissionFragment
        }

        airTravelEmissionsLongHaul {
          ...EmissionFragment
        }

        dietaryEmissions {
          ...EmissionFragment
        }

        totalEmissions {
          ...EmissionFragment
        }
      }
    }
  }
`
