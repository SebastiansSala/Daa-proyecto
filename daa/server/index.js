const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');

const app = express();

mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log(err));