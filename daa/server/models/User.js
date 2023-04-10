const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
}, {
    timestamps: true
});

module.exports = model('User', userSchema, 'users');