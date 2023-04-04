const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      const token = user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error registering user' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = user.generateAuthToken();
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error logging in user' });
    }
  });
  