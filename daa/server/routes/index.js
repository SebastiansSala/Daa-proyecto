const { Router } = require("express");
const router = Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const Reservation = require("../models/Reservation");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  const newUser = new User({ email, password, role });
  await newUser.save();
  const token = await jwt.sign({ _id: newUser._id }, "secretkey");
  res.status(200).json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("The email doesnt exists");
  if (user.password !== password) return res.status(401).send("Wrong Password");

  const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");

  return res.status(200).json({ token });
});

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauhtorized Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("Unauhtorized Request");
    }

    const payload = await jwt.verify(token, "secretkey");
    if (!payload) {
      return res.status(401).send("Unauhtorized Request");
    }
    req.userId = payload._id;
    req.userRole = payload.role;
    next();
  } catch (e) {
    return res.status(401).send("Unauhtorized Request");
  }
}

router.post("/reservations", async (req, res) => {
  try {
    const { date, numOfPeople, time, email } = req.body;
    const newReservation = new Reservation({ date, numOfPeople, time, email });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
