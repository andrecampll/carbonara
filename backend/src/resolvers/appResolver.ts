import { mergeResolvers } from '@graphql-tools/merge'

import { footprintResolver } from './footprintResolver'

export const appResolvers = mergeResolvers([footprintResolver])
