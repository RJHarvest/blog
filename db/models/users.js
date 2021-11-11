import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const UsersSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  image_url: {
    type: String,
    trim: true,
  }
})

module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema)