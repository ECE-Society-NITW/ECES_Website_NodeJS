const EventController = require("../controllers/event_controller");
const express = require("express");
const multer = require("multer");
const { parseJWT } = require('../middleware/parseJWT')
const EventRoutes = express.Router();
const upload = multer({ dest: "../uploads" });


EventRoutes.get("/", EventController.getEvent);
EventRoutes.post("/", upload.single("photo"), EventController.addEvent);
EventRoutes.put("/:eventId", EventController.updateEvent); 
EventRoutes.patch("/:eventId", EventController.updateEvent); 
EventRoutes.delete("/:eventId", EventController.removeEvent);
EventRoutes.post("/register/:eventId",parseJWT,EventController.addUser);
EventRoutes.post("/unRegister/:eventId",parseJWT,EventController.removeUser);
EventRoutes.post("/feedback/:eventId", parseJWT, EventController.addFeedback);
module.exports = EventRoutes;
