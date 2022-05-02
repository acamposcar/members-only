const mongoose = require('mongoose')
const formatDistanceToNow = require('date-fns/formatDistanceToNow')

const { Schema } = mongoose

const PostSchema = new Schema(
  {
    content: { type: String, required: true, maxLength: 1000 },
    date: { type: Date, required: true, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }
)

PostSchema
  .virtual('formatDate')
  .get(function () {
    return formatDistanceToNow(this.date, { addSuffix: true })
  })

// Export model
module.exports = mongoose.model('Post', PostSchema)
