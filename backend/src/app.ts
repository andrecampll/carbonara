import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import express from 'express'
import { DocumentNode } from 'graphql'
import http from 'http'

import { env } from '@/env'
import { appResolvers } from '@/resolvers/appResolver'
import { appTypeDefs } from '@/typeDefs/appTypeDef'

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
      origin: env.APP_FRONTEND_ENDPOINT,
    }),
    express.json(),
    expressMiddleware(server),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3333 }, resolve),
  )
  console.log(`🚀 Server ready at port 3333!`)
}

startApolloServer(appTypeDefs, appResolvers)
