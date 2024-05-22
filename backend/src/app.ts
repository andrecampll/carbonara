import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import express from 'express'
import { DocumentNode } from 'graphql'
import http from 'http'

import { appResolvers } from './resolvers/appResolver.js'
import { appTypeDefs } from './typeDefs/appTypeDef.js'

const app = express()
const httpServer = http.createServer(app)

async function startApolloServer(
  typeDefs: DocumentNode,
  resolvers: typeof appResolvers,
) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer,
      }),
    ],
  })

  await server.start()

  app.use(
    '/graphql',
    cors({
      origin: 'https://carbonara-jet.vercel.app',
    }),
    express.json(),
    expressMiddleware(server),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3333 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:3333/graphql`)
}

startApolloServer(appTypeDefs, appResolvers)
