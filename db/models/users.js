import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const UsersSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  }
})

module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema)