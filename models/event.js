const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const uuid = require("uuid");

const registeredUserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
});

const feedbackUserSchema = new Schema({
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: {type: String, default:""},
});

const eventSchema = new Schema({
  event_id: { type: String, unique: true },
  title: { type: String, required: true },
  photo: { type: String, default: "" },
  dateTime: { type: Date, default: new Date(),required:true },
  location: { type: String, default: "" },
  description: { type: String, default: "" },
  targetAudience: { type: Number, default: 0 },
  createdOn: { type: Date },
  registeredUsers: [registeredUserSchema],
  feedbacks: [feedbackUserSchema],
});

eventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.event_id = uuid.v1(); 
  }
  this.createdOn = new Date();
  next();
});

const EventModel = model("Event", eventSchema);

module.exports = EventModel;
