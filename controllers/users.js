const bcrypt = require('bcrypt')

// const JwtHelpers = require('./jwt')
const User = require('../models/users')

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  changeInfo
}

function createUser (req, res) {
  const { email, password, username, avatar } = req.body
  const salt = bcrypt.genSaltSync()
  const hashPassword = bcrypt.hashSync(password, salt)
  const userInfo = { email, hashPassword, username, avatar }
  const newUser = new User(userInfo)
  newUser.save()
    .then(data => {
      return res.status(201).json({ success: true, user: data }) // ko return user lam gi
    })
    .catch(error => {
      return res.status(500).json({ success: false, error })
    })
}

function getAllUsers (req, res) {
  User.find()
    .then(users => {
      return res.status(200).json({ success: true, users })
    })
    .catch(error => {
      return res.status(500).json({ success: false, error })
    })
}

function getUserById (req, res) {
  User.findById(req.params.id)
    .then(user => {
      if (user) return res.status(200).json({ success: true, user })
      else return res.status(404).json({ success: false })
    })
    .catch(error => {
      return res.status(500).json({ success: false, error })
    })
}

function changeInfo (req, res) {
  if (!req.params.id || req.user.id !== req.params.id) {
    return res.status(404).send('bad req')
  }
  const { username, email } = req.body
  const updateData = { username, email }
  User.findByIdAndUpdate(req.user.id, updateData)
    .then(userUpdated => {
      if (userUpdated) return res.status(200).json({ success: true })
      else return res.status(404).json({ success: false, userUpdated })
    })
    .catch(error => {
      return res.status(500).json({ success: false, error })
    })
}
