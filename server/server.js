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

// get all questions
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

// Add new question
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

// Get all Answers
app.get('/api/answers', (req, res) => {
    return AnswerModel.find((err, answers) => {
        if (!err) {
            return res.send(answers)
        } else {
            res.statusCode = 500;
            return res.send({error: "Error"});
        }
    })
});

// Add new Answer
app.post('/api/answers', (req, res) => {
    const answers = req.body;
    answers.forEach(item => {
        AnswerModel.findOne({text: item.text}, (err, document) => {
            if (err) {
                return res.status(500).send("Server error", err);
            }
            if (document) {
                res.statusCode = 404;
                return res.send({error: 'Answers already exist'})
            } else {
                const answer = new AnswerModel(item);
                answer.save(err => {
                    if (!err) {
                        return res.send({status: 'OK', answer: answer})
                    } else {
                        res.statusCode = 500;
                        return res.send({status: 500, error: err})
                    }
                });
            }
        });
    });
});

app.post('/api/user/setstatus/:id', (req, res) => {
    return console.log("Res: ", req.body.answers);
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
