import { gql } from '@apollo/client'

export const CALCULATE_FOOTPRINT_MUTATION = gql`
  fragment EmissionFragment on Emission {
    unit
    value
  }

  mutation CALCULATE_FOOTPRINT_MUTATION($input: CalculateInput!) {
    calculate(input: $input) {
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

        dietaryChoiceEmissions {
          ...EmissionFragment
        }

        totalYearlyEmissions {
          ...EmissionFragment
        }
      }
    }
  }
`
