const jwt = require('jsonwebtoken')

module.exports = {
  generateToken,
  generateRefreshToken
}

function generateToken (userCredentials) {
  const token = jwt.sign(userCredentials, process.env.JWT_SECRET, { expiresIn: '24h' })
  return token
}

function generateRefreshToken (userCredentials) {
  return jwt.sign(userCredentials, process.env.JWT_SECRET, { expiresIn: '30days' })
}
