const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://prueba:prueba1234567890@cluster.fmet4xa.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));