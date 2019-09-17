const bcrypt = require('bcrypt')

const User = require('../models/users')
const JwtController = require('../controllers/jwt')

module.exports = {
  login
}
async function login (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ success: false, message: 'thieu thong tin dang nhap' })
  } else {
    const data = await findUser(req.body.username, req.body.password)
    if (data) {
      if (data.success && data.token) {
        return res.status(200).send({ token: data.token })
      } else {
        return res.status(401).send({ message: data.message })
      }
    } else res.status(401).send({ message: 'đăng nhập thất bại' })
  }
}

function findUser (username, password) {
  return User.findOne({ username })
    .then(user => {
      if (user) {
        const compare = bcrypt.compareSync(password, user.hashPassword)
        if (compare) {
          const credentials = {
            username: user.username,
            email: user.email,
            id: user._id
          }
          const token = JwtController.generateToken(credentials)
          return { success: true, token }
        } else {
          return { success: false, message: 'sai mật khẩu' }
        }
      } else {
        return null
      }
    })
    .catch(error => {
      return error
    })
}
