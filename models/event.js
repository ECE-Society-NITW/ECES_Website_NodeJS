const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const uuid = require('uuid');

const eventSchema = new Schema({
  event_id: { type: String, unique: true },
  title: { type: String, required: false },
  photo: { type: String, default: "" },
  dateTime: { type: Date, required: false },
  location: { type: String, default: "" },
  description: { type: String, default: "" },
  targetAudience: { type: Number, default: 0 },
  createdOn: { type: Date },
});

eventSchema.pre('save', function (next) {
  this.event_id = uuid.v1();
  this.createdOn = new Date();
  next();
});

const EventModel = model("Event", eventSchema);

module.exports = EventModel;
