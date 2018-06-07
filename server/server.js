const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

const UserModel = require('./models/user.model');

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

app.post('/api/users', (req, res) => {
    UserModel.findOne({name: req.body.name}, (err, document) => {
        if(err) {
            res.statusCode = 500;
            return res.send({error: "Server error"})
        }
        if(document){
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

app.post('/api/user/setstatus/:id', (req, res) => {
    return console.log("Res: ", req.body.answers);
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
