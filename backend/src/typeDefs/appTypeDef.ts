import { mergeTypeDefs } from '@graphql-tools/merge'

import { footprintTypeDef } from './footprintTypeDef'

export const appTypeDefs = mergeTypeDefs([footprintTypeDef])
