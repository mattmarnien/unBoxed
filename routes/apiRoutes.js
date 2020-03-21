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
            state: req.body.state

        }).then(data => {
            console.log("New user added")
            res.json(data);
        })
    });
    ;

    router.post("/search", (req, res) => {

        db.Game.findOne({
            where: {
                names: req.body.name
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


    router.put("api/users/:id", isLoggedIn, (req, res) => {

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
                    id: req.sessions.passport.user
                }
            }).then(data => {
                res.json(data);
            });
    });

    router.delete("/api/users/:id", isLoggedIn, (req, res) => {

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
                attributes: ['id', 'names'],

            }]
        }).then(data => {
            let group = data;
            db.User.findOne({

                where: { id: req.session.passport.user },
                include: [{
                    model: db.Game,
                    as: 'games',
                    required: true,
                    attributes: ['id', 'names'],
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
