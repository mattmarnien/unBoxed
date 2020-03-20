const express = require("express");
const router = express.Router();
const axios = require('axios').default;
var passport = require('passport');
const bcrypt = require('bcrypt')

// routes for api calls across unBoxed
const db = require('../models')
module.exports = function (router) {    
    router.post("/api/signup", (req, res) => {
       
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
        });
    });

    router.get("/api/games", (req, res) => {
        db.Game.findAll({ limit: 10 }).then(data => {


            res.send(data);
        })
    })


    router.put("api/users/:id", passport.authenticate('local'), (req, res) => {

        db.User.update({
            username: req.body.username,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state
        },
            {
                where: {
                    id: req.user.id
                }
            }).then(data => {
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
}
