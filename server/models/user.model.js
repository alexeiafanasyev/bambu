const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    type: String,
    answers: [],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
    /*SavingAnswer: String,
    LoanAnswer: String*/
});

module.exports = mongoose.model('User', UserSchema);