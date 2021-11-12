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

  type Profile {
    id: ID!
    name: String
    imageUrl: String
    blogs: [Blog]
  }

  type User {
    id: ID!
    name: String
    imageUrl: String
  }

  type UserBlogCount {
    _id: ID!
    name: String
    imageUrl: String
    blogCount: Int
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
    authors: [UserBlogCount]
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
    blogs(limit: Int!, page: Int!, type: BlogType, authorId: ID): BlogPage
    blog(id: ID!): Blog
    typeCount: TypeCount
    profile(id: ID!): Profile
  }

  type Mutation {
    newBlog(input: BlogInput!): Blog
    updateBlog(id: ID!, input: BlogInput!): Blog
    newComment(blogId: ID!, input: CommentInput!): Blog
  }
`

module.exports = typeDefs
