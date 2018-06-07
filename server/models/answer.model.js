const mongoose = require('mongoose');

const Answer = mongoose.Schema({
    text: {type: String, required: true},
    score: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Answer', AnswerSchema);