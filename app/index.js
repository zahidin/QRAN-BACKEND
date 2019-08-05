import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import typeDefs from './typedef'
import resolvers from './resolvers'

const app = express()
app.use(cors())
dotenv.config()

const server  = new ApolloServer({
    typeDefs,
    resolvers,
    playground:true
})
server.applyMiddleware({ app })
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`)
})