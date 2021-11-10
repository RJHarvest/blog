import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import CommentsSchema from './comments'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const BlogsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['food', 'travel', 'tech', 'lifestyle'],
    required: true,
    trim: true,
  },
  comments: [CommentsSchema],
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

BlogsSchema.index({ title: 'text' })
BlogsSchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Blogs || mongoose.model('Blogs', BlogsSchema)