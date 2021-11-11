import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '../../../db/models/users'

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60 // the session will last 7 days
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        const existingUser = await User.findOne({ google_id: user.id })
        if (existingUser) return Promise.resolve({ ...existingUser })

        const newUser = await User({
          name: user.name,
          image_url: user.image,
        }).save()
        return Promise.resolve({ ...newUser })
      }
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user.name = user._doc.name
      session.user.image = user._doc.image_url
      session.user.uid = user._doc._id
      return Promise.resolve(session)
    }
  }
})