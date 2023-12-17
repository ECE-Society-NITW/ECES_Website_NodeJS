const EventController = require('../controllers/event_controller')
const EventRoutes = require('express').Router();

EventRoutes.get('/', EventController.getEvent);
EventRoutes.post('/', EventController.addEvent);
EventRoutes.delete('/', EventController.removeEvent);

module.exports = EventRoutes;