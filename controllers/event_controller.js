const EventModel = require("../models/event");
const jwt = require("jsonwebtoken");
const EventController = {
  getEvent: async function (req, res) {
    try {
      const events = await EventModel.find();
      return res.json({ success: true, data: events });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  addEvent: async function (req, res) {
    try {
      const {
        title,
        photo,
        dateTime,
        location,
        description,
        targetAudience,
        createdOn,
      } = req.body;
      const newEvent = new EventModel({
        title,
        photo: photo || "",
        dateTime,
        location: location || "",
        description: description || "",
        targetAudience: targetAudience || 0,
        createdOn: createdOn || new Date(),
      });

      await newEvent.save();

      return res.json({
        success: true,
        data: newEvent,
        message: "Event added successfully",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  updateEvent: async function (req, res) {
    try {
      const eventId = req.params.eventId;
      const updatedEvent = await EventModel.findOneAndUpdate(
        { _id: eventId },
        req.body,
        { new: true }
      );

      return res.json({
        success: true,
        data: updatedEvent,
        message: "Event updated successfully",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  removeEvent: async function (req, res) {
    try {
      const eventId = req.params.eventId;
      const removedEvent = await EventModel.findByIdAndDelete(eventId);
      if (!removedEvent) {
        return res.json({ success: false, message: "Event not found" });
      }

      return res.json({
        success: true,
        data: removedEvent,
        message: "Event removed successfully",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  addUser: async function (req, res) {
    try {
      const { email, name } = req.body.user;
      const event_id = req.params.eventId;
      const existingEvent = await EventModel.findOne({event_id});
      console.log(existingEvent);
      if (!existingEvent) {
        return res.json({ success: false, message: "Event not found" });
      }

      existingEvent.registeredUsers.push({ email, name });
      const updatedEvent = await existingEvent.save();

      return res.json({
        success: true,
        data: updatedEvent,
        message: "User added to event successfully",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = EventController;
