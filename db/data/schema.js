import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  scalar DateTime

  enum BlogType {
    food
    travel
    tech
    lifestyle
  }

  type TypeCount {
    food: Int
    travel: Int
    tech: Int
    lifestyle: Int
  }

  type User {
    id: ID!
    name: String
    imageUrl: String
  }

  type Comment {
    id: ID!
    comment: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Blog {
    id: ID!
    user: User
    title: String
    body: String
    type: BlogType
    comments: [Comment]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type BlogPage {
    docs: [Blog]
    total: Int
    limit: Int
    page: Int
    pages: Int
  }

  input BlogInput {
    title: String!
    body: String!
    type: BlogType!
  }

  input CommentInput {
    comment: String!
  }

  type Query {
    blogs(limit: Int!, page: Int!, type: BlogType): BlogPage
    blog(id: ID!): Blog
    typeCount: TypeCount
  }

  type Mutation {
    newBlog(input: BlogInput!): Blog
    updateBlog(id: ID!, input: BlogInput!): Blog
    newComment(blogId: ID!, input: CommentInput!): Blog
    updateComment(blogId: ID!, commentId: ID!, input: CommentInput!): Blog
  }
`

module.exports = typeDefs
