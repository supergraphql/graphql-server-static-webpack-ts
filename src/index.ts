import { GraphQLServer } from 'graphql-yoga'
import { Context } from './utils'

const typeDefs = require('!!raw-loader!bundle-loader!./schema.graphql')
const { Binding } = require('!!binding-loader!bundle-loader!../database/schema.generated.graphql')

const resolvers = {
  Query: {
    feed(parent, args, ctx: Context, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx: Context, info) {
      return ctx.db.mutation.createPost(
        // TODO remove `isPublished` in favour of default value
        { data: { title, text, isPublished: false } },
        info,
      )
    },
    publish(parent, { id }, ctx: Context, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Binding({
      endpoint: 'https://database-beta.graph.cool/api/graphql-server-static/dev',
      secret: 'mysecret123',
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
