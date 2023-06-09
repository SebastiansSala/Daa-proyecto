const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: { type: String, required: true },
  numOfPeople: { type: Number, required: true },
  time: { type: String, required: true },
  email: {type: String, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
