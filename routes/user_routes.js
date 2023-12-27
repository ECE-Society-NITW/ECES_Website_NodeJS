const UserController = require('../controllers/user_controller')
const UserRoutes = require('express').Router()
const { parseJWT } = require('../middleware/parseJWT')

UserRoutes.get('/:credential', UserController.getUser)
UserRoutes.post('/', parseJWT, UserController.createUser)
UserRoutes.delete('/', parseJWT, UserController.deleteUser)

module.exports = UserRoutes