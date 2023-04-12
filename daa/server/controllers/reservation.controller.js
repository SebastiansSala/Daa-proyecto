const Reservation = require("../models/Reservation");

module.exports = {
    createReservation: async (req, res) => {
        try {
          const { date, numOfPeople, time, email } = req.body;
          const newReservation = new Reservation({ date, numOfPeople, time, email });
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
      }
}
