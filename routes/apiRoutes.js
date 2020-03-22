const express = require("express");
const router = express.Router();
const axios = require('axios').default;
var passport = require('passport');
const bcrypt = require('bcrypt')

// routes for api calls across unBoxed
const db = require('../models')
module.exports = function (router) {
    router.post("/api/signup", (req, res) => {
<<<<<<< Updated upstream

        const authId = "4dfe4ca2-e094-16cf-b3ac-79c826357f87";
        const authToken = "a6Z90FIoqCoEkPGGZOWs"
        let queryUrl = "https://us-zipcode.api.smartystreets.com/lookup?auth-id=" + authId + "&auth-token=" + authToken + "&city=" + req.body.city + "&state=" + req.body.state;
        console.log(queryUrl)

        axios.get(queryUrl, {
            method: "GET"
        }).then(zipData => {
            let zip = zipData.data[0].zipcodes[0].zipcode;
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: db.User.generateHash(req.body.password),
                city: req.body.city,
                state: req.body.state,
                zipcode: zip

            }).then(data => {
                console.log("New user added")
                res.json(data);
            })
=======

        db.User.create({
            username: req.body.username,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: db.User.generateHash(req.body.password),
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            avatar: req.body.avatar

        }).then(data => {
            console.log("New user added")
            res.json(data);
        })
    });
    ;

    router.post("/search", (req, res) => {

        db.Game.findOne({
            where: {
                name: req.body.name
            }
        }).then(data => {

            res.json(data);
>>>>>>> Stashed changes
        });
    });

    router.get("/api/games", (req, res) => {
        db.Game.findAll({ limit: 10 }).then(data => {


            res.send(data);
        })
    })


    router.put("/api/users", isLoggedIn, (req, res) => {
        let changeObj = {};
        console.log(req.body);
        if (req.body.firstname) {
            changeObj.firstname = req.body.firstname;
        }
        if (req.body.email) {
            changeObj.email = req.body.email;
        }
        if (req.body.lastname) {
            changeObj.lastname = req.body.lastname;
        }
        if (req.body.password) {
            changeObj.password = db.User.generateHash(req.body.password);
        }
        if (req.body.city) {
            changeObj.city = req.body.city;
        }
        if (req.body.state) {
            changeObj.state = req.body.state;
        }
        if (req.body.zipcode) {
            changeObj.zipcode = req.body.zipcode;
        }
        if (req.body.avatar) {
            changeObj.avatar = req.body.avatar;
        }
        if (req.body.onlineGaming) {
            changeObj.onlineGaming = req.body.onlineGaming;
        }
        if (req.body.bio) {
            changeObj.bio = req.body.bio;
        }
        db.User.update(changeObj, { where: { id: req.session.passport.user } }).then(data => {
            res.json(data);
        });
    });

    router.delete("/api/users/:id", passport.authenticate('local'), (req, res) => {
        db.User.destroy({ where: { id: req.user.id } }).then(data => {
            res.json(data);
        });
    });

    router.post("/api/users/games/", passport.authenticate('local'), (req, res) => {
        console.log(req.user.id);
        db.UserGame.create({ userId: req.user.id, gameId: req.body.id })

    });

    router.get("/api/users/group", (req, res) => {
        db.User.findAll({
            where: {
                onlineGaming: 1
            },
            include: [{
                model: db.Game,
                as: 'games',
                required: false,
                attributes: ['id', 'names'],

            }]
        }).then(data => {
            if (!data.length) {
                res.status(204);
            }
            res.send(data);
        })

    })

    router.get("/search"), async (req, res) => {
        db.Game.findAll({
            where: {
                na
            }
        })
    }
}
