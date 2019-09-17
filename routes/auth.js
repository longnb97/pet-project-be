const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auth')

// router.get('/',(req, res) => res.send("hello"));
router.post('/login', AuthController.login)

module.exports = router
