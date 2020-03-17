const express = require("express");
const router = express.Router();

// routes for api calls across unBoxed
const db = require('../models')

router.post("/api/users", (req,res) =>{
    User.create({
        userName: req.body.userName,
        email: req.body.email,
        firstName: reqq.body.firstName,
        lastName: req.body.lastName
    }).then(data => {
        res.json(data);
    });

});

router.put("api/users/:id", (req,res) =>{
    User.update({
        userName: req.body.userName,
        email: req.body.email,
        firstName: reqq.body.firstName,
        lastName: req.body.lastName
    },
    {where: {
        id: req.params.id
    }}).then(data => {
        res.json(data);
    });

});

router.delete("api/users/:id", (req, res) =>{
    User.destroy({where: {id: req.params.id}}).then( data => {
        res.json(data);
    });
});

router.put("/api/users/games/:id", async (req,res) => {
     let thisUser = await User.findOne({where : {id = req.params.id}});
    User.addGame(req.body.game)
    .then(data => {
        res.json(data);
    })
});