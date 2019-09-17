const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')

router.get('/', UsersController.getAllUsers)
router.post('/', UsersController.createUser)
router.put('/:id', UsersController.changeInfo)
router.get('/:id', UsersController.getUserById)

module.exports = router
