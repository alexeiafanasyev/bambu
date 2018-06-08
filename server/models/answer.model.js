const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    text: {type: String, required: true},
    score: {type: String, required: true}
});

module.exports = mongoose.model('Answer', AnswerSchema);