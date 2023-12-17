const EventModel = require("../models/event");

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
      const { name, date } = req.body;
      const newEvent = new EventModel({ name, date });

      await newEvent.save();

      return res.json({ success: true, data: newEvent, message: "Event added successfully" });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  removeEvent: async function (req, res) {
    try {
      const eventId = req.params.eventId;
      const removedEvent = await EventModel.findByIdAndRemove(eventId);

      if (!removedEvent) {
        return res.json({ success: false, message: "Event not found" });
      }

      return res.json({ success: true, data: removedEvent, message: "Event removed successfully" });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = EventController;
