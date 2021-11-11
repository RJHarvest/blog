import { ApolloServer } from 'apollo-server-micro'
import { getSession } from 'next-auth/client'
import typeDefs from '../../db/data/schema'
import resolvers from '../../db/data/resolvers'
import connectDb from '../../db/config'

connectDb()

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const session = await getSession({ req })
    return { session }
  },
})
const startServer = apolloServer.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
