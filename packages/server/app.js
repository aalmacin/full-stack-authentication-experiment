const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const dbConnect = require("./db/dbConnect");
dbConnect();

const bcrypt = require("bcrypt");
const User = require("./db/userModel");

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    next();
});

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            }).catch(err => {
                res.status(500).json({
                    message: "Error creating user!",
                    error: err
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error while hashing password",
                err
            });
        });
})


module.exports = app;