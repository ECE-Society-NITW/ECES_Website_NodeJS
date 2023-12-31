const EventModel = require("../models/event")
const EventController = {
  getEvent: async function (req, res) {
    try {
      const events = await EventModel.find()
      return res.json({ success: true, data: events })
    } catch (ex) {
      return res.json({ success: false, message: ex })
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
      } = req.body
      const newEvent = new EventModel({
        title,
        photo: photo || "",
        dateTime,
        location: location || "",
        description: description || "",
        targetAudience: targetAudience || 0,
        createdOn: createdOn || new Date(),
      })

      await newEvent.save()

      return res.json({
        success: true,
        data: newEvent,
        message: "Event added successfully",
      })
    } catch (ex) {
      return res.json({ success: false, message: ex })
    }
  },

  updateEvent: async function (req, res) {
    try {
      const event_id = req.params.eventId
      const updatedEvent = await EventModel.findOneAndUpdate(
        { event_id },
        req.body,
        { new: true }
      )

      return res.json({
        success: true,
        data: updatedEvent,
        message: "Event updated successfully",
      })
    } catch (ex) {
      return res.json({ success: false, message: ex })
    }
  },

  removeEvent: async function (req, res) {
    try {
      const event_id = req.params.eventId
      const removedEvent = await EventModel.findOneAndDelete({ event_id })
      if (!removedEvent) {
        return res.json({ success: false, message: "Event not found" })
      }
      return res.json({
        success: true,
        data: removedEvent,
        message: "Event removed successfully",
      })
    } catch (ex) {
      return res.json({ success: false, message: ex })
    }
  },
  addUser: async function (req, res) {
    try {
      const { email, name } = req.body.user
      const event_id = req.params.eventId
      const isUserRegistered = await EventModel.exists({
        event_id,
        'registeredUsers.email': email,
      })

      if (isUserRegistered) {
        return res.json({
          success: false,
          message: 'Already registered!',
        })
      }
      const updatedEvent = await EventModel.findOneAndUpdate(
        { event_id },
        { $push: { registeredUsers: { email, name } } },
        { new: true }
      )

      if (!updatedEvent) {
        return res.json({ success: false, message: 'Event not found' })
      }

      return res.json({
        success: true,
        message: `Successfully registered to ${updatedEvent.title}`,
      })
    } catch (ex) {
      return res.json({ success: false, message: ex })
    }
  },
  removeUser: async function (req, res) {
    try {
      const { email } = req.body.user
      const event_id = req.params.eventId
      const event = await EventModel.findOne({ event_id })
      if (!event)
        return res.json({ success: false, message: 'Event not found' })
      const isUserRegistered = event.registeredUsers.some((user) => user.email === email)
      if (!isUserRegistered) {
        return res.json({
          success: false,
          message: `Not registered for this event`,
        })
      }
      const updatedEvent = await EventModel.findOneAndUpdate(
        { event_id },
        { $pull: { registeredUsers: { email } } },
        { new: true }
      )
      return res.json({
        success: true,
        message: `Cancelled Registration ${updatedEvent.title}`,
      })
    } catch (ex) {
      return res.json({ success: false, message: ex })
    }
  },
  addFeedback: async function (req, res) { 
    try {
      const { email } = req.body.user;
      const { comments, rating } = req.body;
      const event_id = req.params.eventId;
      const event = await EventModel.findOne({ event_id });
      if (!event)
        return res.json({ success: false, message: "Event not found" });
      // add to feedbacks array
      const updateEvent = await EventModel.findOneAndUpdate(
        { event_id },
        {
          $push: { feedbacks: { email, comments, rating } }
        },
        { new: true }
      );
        
      console.log(updateEvent);
      return res.json({
        success: true,
        message: `Feedback added to ${updateEvent.title}`,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  }
}

module.exports = EventController
