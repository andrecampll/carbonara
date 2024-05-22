import { ApolloServer } from '@apollo/server'
import { assert, beforeEach, describe, expect, it } from 'vitest'

import { Footprint } from '../src/data/types/footprint'
import { appResolvers } from '../src/resolvers/appResolver'
import { appTypeDefs } from '../src/typeDefs/appTypeDef'
import { footprintMutation } from './mock/footprint.mutation'

type CalculateFootprintResponse = {
  calculate: {
    footprint: Footprint
  }
}

describe('Footprint', () => {
  let testServer = null

  beforeEach(() => {
    testServer = new ApolloServer({
      typeDefs: appTypeDefs,
      resolvers: appResolvers,
    })
  })

  it('should be able to test initial API query', async () => {
    const response = await testServer.executeOperation({
      query: 'query footprint { footprint }',
      variables: { name: 'world' },
    })

    assert(response.body.kind === 'single')
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.footprint).toBe('test')
  })

  it('should be able to calculate footprint mutation', async () => {
    const testServer = new ApolloServer({
      typeDefs: appTypeDefs,
      resolvers: appResolvers,
    })

    const response =
      await testServer.executeOperation<CalculateFootprintResponse>({
        query: footprintMutation,
        variables: {
          input: {
            electricityUsageKWh: 100,
            transportationUsageGallonsPerMonth: 100,
            flightsShortHaul: 100,
            flightsMediumHaul: 100,
            flightsLongHaul: 100,
            dietaryChoice: 'Vegan',
          },
        },
      })

    assert(response.body.kind === 'single')
    expect(response.body.singleResult.errors).toBeUndefined()

    const footprint = response.body.singleResult.data?.calculate.footprint

    expect(footprint.electricityEmissions).toEqual({
      value: 39.78,
      unit: 'kgCO2e',
    })
    expect(footprint.transportationEmissions).toEqual({
      value: 908.6999999999999,
      unit: 'kgCO2e',
    })
    expect(footprint.airTravelEmissionsShortHaul).toEqual({
      value: 10000,
      unit: 'kgCO2e/year',
    })
    expect(footprint.airTravelEmissionsMediumHaul).toEqual({
      value: 20000,
      unit: 'kgCO2e/year',
    })
    expect(footprint.airTravelEmissionsLongHaul).toEqual({
      value: 30000,
      unit: 'kgCO2e/year',
    })
    expect(footprint.totalAirTravelEmissions).toEqual({
      value: 60000,
      unit: 'kgCO2e/year',
    })

    expect(footprint.yearlyElectricityEmissions).toEqual({
      value: 477.36,
      unit: 'kgCO2e/year',
    })

    expect(footprint.yearlyTransportationEmissions).toEqual({
      value: 10904.4,
      unit: 'kgCO2e/year',
    })

    expect(footprint.dietaryChoiceEmissions).toEqual({
      value: 200,
      unit: 'kgCO2e/year',
    })
  })
})
