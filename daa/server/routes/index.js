const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const {
  getAllReservations,
  createReservation,
  deleteReservation,
  updateReservation,
} = require("../controllers/reservation.controller");
const {
  createComment,
  getAllComments,
} = require("../controllers/comment.controller");

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); 
  const newUser = new User({ email, password: hashedPassword, role }); 
  await newUser.save();
  const token = await jwt.sign({ _id: newUser._id }, "secretkey");
  res.status(200).json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("The email doesn't exist");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).send("Wrong Password");

  const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");

  return res.status(200).json({ token });
});




router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  };

router.post("/reservations", createReservation);
router.get("/reservations", getAllReservations);
router.put("/reservations/:id", updateReservation);
router.delete("/reservations/:id", deleteReservation);

router.post("/comments", createComment);
router.get("/comments", getAllComments);

module.exports = router;
