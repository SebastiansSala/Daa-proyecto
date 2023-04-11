const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  numOfPeople: { type: Number, required: true },
  time: { type: String, required: true },
  email: {type: String, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
