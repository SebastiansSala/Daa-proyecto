const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comentario: { type: String, required: true },
    email: {type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
