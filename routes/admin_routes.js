const AdminController = require('../controllers/admin_controller')
const AdminRoutes = require('express').Router()

AdminRoutes.post('/sendmail/', AdminController.sendMailToRegisteredUsers);

module.exports = AdminRoutes