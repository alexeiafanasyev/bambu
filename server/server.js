const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

const UserModel = require('./models/user.model');
const QuestionModel = require('./models/question.model');
const AnswerModel = require('./models/answer.model');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Add the questions

// Add the answers

app.get('/', (req, res) => {
    res.send('Go to /api/users to see users list');
});


// Get all Users
app.get('/api/users', (req, res) => {
    return UserModel.find((err, users) => {
        if (!err) {
            return res.send(users)
        } else {
            res.statusCode = 500;
            return res.send({error: "Error"});
        }
    })
});

// Add new User
app.post('/api/users', (req, res) => {
    UserModel.findOne({name: req.body.name}, (err, document) => {
        if (err) {
            res.statusCode = 500;
            return res.send({error: "Server error"})
        }
        if (document) {
            res.statusCode = 404;
            return res.send({error: 'User already exist'})
        } else {
            const user = new UserModel(req.body);
            user.save(err => {
                if (!err) {
                    return res.send({status: 'OK', user: user})
                } else {
                    res.statusCode = 500;
                    return res.send({error: "Error"})
                }
            });
        }
    });
});

app.get('/api/questions', (req, res) => {
    return QuestionModel.find((err, questions) => {
        if (!err) {
            return res.send(questions)
        } else {
            res.statusCode = 500;
            return res.send({error: "Error"});
        }
    })
});

app.post('/api/questions', (req, res) => {
    QuestionModel.findOne({title: req.body.title}, (err, document) => {
        if (err) {
            res.statusCode = 500;
            return res.send({error: "Server error"})
        }
        if (document) {
            res.statusCode = 404;
            return res.send({error: 'Question already exist'})
        } else {
            const question = new QuestionModel(req.body);
            question.save(err => {
                if (!err) {
                    return res.send({status: 'OK', question: question})
                } else {
                    res.statusCode = 500;
                    return res.send({error: "Error"})
                }
            });
        }
    });
});

app.post('/api/user/setstatus/:id', (req, res) => {
    return console.log("Res: ", req.body.answers);
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
