import { mergeResolvers } from '@graphql-tools/merge'

import { footprintResolver } from './footprintResolver.js'

export const appResolvers = mergeResolvers([footprintResolver])
