const express = require("express");
const router = express.Router();
const axios = require('axios').default;
var passport = require('passport');
const bcrypt = require('bcrypt')
const { Op } = require("sequelize");

// routes for api calls across unBoxed
const db = require('../models')

module.exports = function (router) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            data = { redirect: "/login" }
            res.json(data)
        }
    }

    router.post("/api/signup", (req, res) => {


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
        });
    })

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

    router.delete("/api/users", isLoggedIn, (req, res) => {

        db.User.destroy({ where: { id: req.user.id } }).then(data => {
            res.end();
        });
    });

    router.post("/api/users/games/", isLoggedIn, (req, res) => {
        console.log(req.body)
        console.log(req.session)
        db.UserGame.create({ userId: req.session.passport.user, gameId: req.body.game }).then(data => {

            res.json(data);
        })

    });

    router.get("/api/users/group", isLoggedIn, (req, res) => {
        console.log(req.session.passport.user)
        db.User.findAll({
            where: {
                [Op.and]: {
                    id: { [Op.ne]: req.session.passport.user },
                    onlineGaming: 1
                }
            },
            include: [{
                model: db.Game,
                as: 'games',
                required: false,

                attributes: ['id', 'name'],


            }]
        }).then(data => {
            let group = data;
            db.User.findOne({

                where: { id: req.session.passport.user },
                include: [{
                    model: db.Game,
                    as: 'games',
                    required: true,
                    attributes: ['id', 'name'],
                }]
            }).then(thisUser => {
                console.log(group)
                console.log(thisUser)
                let returnObj = { group, thisUser }
                if (!data.length) {
                    res.status(204);
                }
                res.send(returnObj);
            })

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
