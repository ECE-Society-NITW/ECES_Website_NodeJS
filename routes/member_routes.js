const MemberRoutes = require('express').Router()
const memberController = require('../controllers/member_controller')

MemberRoutes.get('/', memberController.getAllMembers)

module.exports = MemberRoutes