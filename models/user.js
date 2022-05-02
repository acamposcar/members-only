const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 50 },
    username: { type: String, required: true, maxLength: 200, unique: true },
    password: { type: String, required: true, minlength: 4, maxLength: 200 },
    admin: { type: Boolean, required: true, default: false }
  }
)

// Export model
module.exports = mongoose.model('User', UserSchema)
