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
    let scoreList = [];
    UserModel.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            res.statusCode = 500;
            return res.send({error: "Server error"})
        }
        if (!user) {
            res.statusCode = 404;
            return res.send({error: 'User not found'})
        } else {
            let scoreList = [];
            let questionsIds = req.body.map(item => item.question);
            QuestionModel
                .find({_id: {$in: questionsIds}}, (err, question) => {
                })
                .populate({
                    path: 'answers'
                })
                .exec()
                .then(questions => {
                    req.body.forEach(item => {
                        questions.forEach(question => {
                            // console.log("Item: ", item);
                            // console.log("Question: ", question);
                            if (question._id == item.question) {
                                let answers = question.answers;
                                let req_answer = item.answer;
                                // console.log("Answers: ", answers);
                                // console.log("REQ Answer: ", req_answer);
                                answers.forEach(answer => {
                                   if(answer.text == req_answer){
                                       scoreList.push(answer.score)
                                   }
                                });
                            }
                        })
                    });
                })
                .then(res => {
                    let totalScore = 0;
                    scoreList.forEach(item => {
                        totalScore = totalScore + Number(item);
                    });
                    let userType = '';
                    if(totalScore >= 8) userType = 'A';
                    else if(totalScore >= 6) userType = 'B';
                    else if(totalScore >= 4) userType = 'C';
                    else if(totalScore >= 2) userType = 'D';
                    UserModel.updateOne({ type: userType}, (err) => {
                        if(err){
                            console.log("User type update error");
                        } else {
                            console.log("User type update successfully");
                        }
                    })
                })
                .catch(err => res.status(500));
        }
    });
    return res.send({status: 'OK'})
});

app.listen(port, () => {
    console.log('Server running on' + port);
});
