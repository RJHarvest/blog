import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import User from '../models/users'
import Blog from '../models/blogs'

const ObjectId = require('mongodb').ObjectID

const resolvers = {
  Query: {
    blogs: async (_, { limit, page, type, authorId }) => {
      let query = {}
      if (type) query = { type }
      if (authorId) query = { user: ObjectId(authorId) }
      const blogs = await Blog.paginate(query, { limit, page, sort: { createdAt: 'desc' } })

      const userBlogCount = await User.aggregate([
        {
          $lookup: {
            from: 'blogs',
            localField: '_id',
            foreignField: 'user',
            as: 'blogs'
          }
        },
        { $unwind: '$blogs' },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            imageUrl: { $first: '$imageUrl' },
            blogCount: { $sum: 1 }
          }
        },
        { $limit : 5 },
        { $sort: { name: 1 } }
      ])

      blogs.authors = userBlogCount
      return blogs
    },
    blog: async (_, { id }) => {
      const blog = await Blog.findById(id)
      if (!blog) throw new Error('Blog not found')
      return blog
    },
    typeCount: async () => {
      const blogs = await Blog.find({})
      const foodCount = blogs.filter(blog => blog.type === 'food').length
      const travelCount = blogs.filter(blog => blog.type === 'travel').length
      const techCount = blogs.filter(blog => blog.type === 'tech').length
      const lifestyleCount = blogs.filter(blog => blog.type === 'lifestyle').length
      return {
        food: foodCount,
        travel: travelCount,
        tech: techCount,
        lifestyle: lifestyleCount,
      }
    },
    profile: async (_, { id }) => {
      const user = await User.findOne({ _id: id })
      if (!user) throw new UserInputError('User not found')

      const blogs = await Blog.find({ user: ObjectId(id) }).sort({ createdAt: 'desc' })
      user.blogs = blogs
      return user
    }
  },

  Mutation: {
    // blogs
    newBlog: async (_, { input }, { session }) => {
      if (!session) throw new AuthenticationError('You must be logged in')

      const blog = new Blog({ ...input, user: session.user.uid })
      return await blog.save()
    },
    updateBlog: async (_, { id, userId, input }, { session }) => {
      if (!session) throw new AuthenticationError('You must be logged in')

      const blog = await Blog.findById(id)
      if (!blog) throw new UserInputError('Blog not found')

      return await Blog.findOneAndUpdate(
        { _id: id },
        { ...input, user: session.user.id },
        { new: true }
      )
    },
    // comments
    newComment: async (_, { blogId, input }) => {
      const blog = await Blog.findById(blogId)
      if (!blog) throw new UserInputError('Blog not found')

      blog.comments.push(input)
      blog.markModified('comments')
      return await blog.save()
    },
  },
}

export default resolvers
