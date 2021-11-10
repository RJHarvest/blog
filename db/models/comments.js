import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CommentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    defalut: Date.now(),
  },
  updatedAt: {
    type: Date,
    defalut: Date.now(),
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

module.exports = CommentsSchema