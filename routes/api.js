const express = require('express')
const router = express.Router()

// const jwt = require('express-jwt')

module.exports = router

// router.use(
//   jwt({ secret: process.env.JWT_SECRET })
//     .unless({
//       path: [
//         '/api/auth/login',
//         '/api/users'
//       ]
//     }),
//   function (req, res, next) {
//     return next()
//   }
// )

router.use('/auth', require('./auth'))
router.use('/files', require('./files'))
router.use('/users', require('./users'))

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...')
  }
})
