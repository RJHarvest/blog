import Blog from '../models/blogs'

const resolvers = {
  Query: {
    blogs: async (_, { limit, page, type }) => {
      try {
        const query = type ? { type } : {}
        return await Blog.paginate(query, { limit, page, sort: { createdAt: 'desc' } })
      } catch (err) {
        throw err
      }
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
    }
  },

  Mutation: {
    // blogs
    newBlog: async (_, { input }) => {
      try {
        const blog = new Blog(input)
        return await blog.save()
      } catch (err) {
        console.log(err)
      }
    },
    updateBlog: async (_, { id, input }) => {
      const blog = await Blog.findById(id)
      if (!blog) throw new Error('Blog not found')

      return await Blog.findOneAndUpdate({ _id: id }, input, {
        new: true,
      })
    },
    // comments
    newComment: async (_, { blogId, input }) => {
      const blog = await Blog.findById(blogId)
      if (!blog) throw new Error('Blog not found')

      blog.comments.push(input)
      blog.markModified('comments')
      return await blog.save()
    },
    updateComment: async (_, { blogId, commentId, input }) => {
      const blog = await Blog.findById(blogId)
      if (!blog) throw new Error('Blog not found')

      blog.comments.id(commentId).comment = input.comment
      blog.markModified('comments')
      return await blog.save()
    }
  },
}

export default resolvers