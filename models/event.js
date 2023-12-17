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


const EventModel = model("Event", eventSchema);

// Add mock data
const mockEvents = [
  {

    event_id:1,
    title: 'Event 1',
    photo: 'https://cdn.britannica.com/92/212692-050-D53981F5/labradoodle-dog-stick-running-grass.jpg',
    dateTime: new Date('2023-12-31T19:00:00'),
    location: 'ALC',
    description: 'Technozion opening ceremony',
    targetAudience: 2023,
  },
  {
    event_id:2,
    title: 'Event 2',
    photo: 'https://cdn.britannica.com/92/212692-050-D53981F5/labradoodle-dog-stick-running-grass.jpg',
    dateTime: new Date('2023-12-31T20:00:00'),
    location: 'Main Auditorium',
    description: 'Tech Expo 2023',
    targetAudience: 2023,
  },
  {
    event_id:3,
    title: 'Event 3',
    photo: 'https://cdn.britannica.com/92/212692-050-D53981F5/labradoodle-dog-stick-running-grass.jpg',
    dateTime: new Date('2023-12-31T21:00:00'),
    location: 'Outdoor Stage',
    description: 'Music Night',
    targetAudience: 2023,
  },
  {
    event_id:4,
    title: 'Event 4',
    photo: 'https://cdn.britannica.com/92/212692-050-D53981F5/labradoodle-dog-stick-running-grass.jpg',
    dateTime: new Date('2023-12-31T22:00:00'),
    location: 'Workshop Room',
    description: 'Coding Workshop',
    targetAudience: 2023,
  },
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
