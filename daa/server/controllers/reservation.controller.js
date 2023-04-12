const Reservation = require("../models/Reservation");

module.exports = {
  createReservation: async (req, res) => {
    try {
      const { date, numOfPeople, time, email } = req.body;
      const newReservation = new Reservation({
        date,
        numOfPeople,
        time,
        email,
      });
      await newReservation.save();
      res.status(201).json(newReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllReservations: async (req, res) => {
    try {
      const reservations = await Reservation.find({});
      res.send(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteReservation: async (req, res) => {
    try {
      const { id } = req.params;
      await Reservation.findByIdAndDelete(id);
      res.json({ message: "Reservación eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error eliminando la reservación");
    }
  },

  updateReservation: async (req, res) => {
    try {
      const { id } = req.params;
      const { numOfPeople, time } = req.body;
  
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      
      reservation.numOfPeople = numOfPeople;
      reservation.time = time;
      const updatedReservation = await reservation.save();
      res.json(updatedReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};
