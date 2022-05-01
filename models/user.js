const mongoose = require('mongoose')

const { Schema } = mongoose

const User = new Schema(
  {
    username: { type: String, required: true, maxLength: 50 },
    password: { type: String, required: true, maxLength: 50 }
  }
)

// Export model
module.exports = mongoose.model('Movie', User)
