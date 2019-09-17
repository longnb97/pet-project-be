const mongoose = require('mongoose')

const User = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  hashPassword: { type: String, required: true },
  avatar: { type: String, default: 'none' }
}, { timestamps: true })

module.exports = mongoose.model('User', User)
