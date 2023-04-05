const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db');

app.set('port', process.env.PORT || 4000)

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/index'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));