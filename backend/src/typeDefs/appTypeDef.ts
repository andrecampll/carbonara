import { mergeTypeDefs } from "@graphql-tools/merge";

import { footprintTypeDef } from './footprintTypeDef.js'

export const appTypeDefs = mergeTypeDefs([footprintTypeDef]);
