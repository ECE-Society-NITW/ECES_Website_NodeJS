const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const uuid = require('uuid');

const eventSchema = new Schema({
  event_id: { type: String, unique: true },
  title: { type: String, required: true },
  photo: { type: String, default: "" },
  dateTime: { type: Date, required: true },
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

// Add mock data
const mockEvents = [
 
  {
    title: 'Event 1',
    dateTime: new Date('2023-12-31T19:00:00'),
    location: 'ALC',
    description: 'Technozion opening ceremony',
    targetAudience: 2023,
  },
  // Add more mock events as needed
];

// Use the promise returned by insertMany
EventModel.insertMany(mockEvents)
  .then(docs => {
    console.log('Mock data added successfully:', docs);
  })
  .catch(err => {
    console.error('Error adding mock data:', err);
  });

module.exports = EventModel;
