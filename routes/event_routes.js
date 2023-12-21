const EventController = require("../controllers/event_controller");
const express = require("express");
const multer = require("multer");

const EventRoutes = express.Router();
const upload = multer({ dest: "../uploads" });


EventRoutes.get("/", EventController.getEvent);
EventRoutes.post("/", upload.single("photo"), EventController.addEvent);
EventRoutes.put("/:eventId", EventController.updateEvent); 
EventRoutes.patch("/:eventId", EventController.updateEvent); 
EventRoutes.delete("/:eventId", EventController.removeEvent);



module.exports = EventRoutes;
