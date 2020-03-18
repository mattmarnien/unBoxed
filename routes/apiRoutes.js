const express = require("express");
const router = express.Router();

// routes for api calls across unBoxed
const db = require('../models')
module.exports = function(router){
router.post("/api/users", (req,res) =>{
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password

    }).then(data => {
        console.log("New user added")
        res.json(data);
    });

});

router.put("api/users/:id", (req,res) =>{
    db.User.update({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    },
        {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
        });
});

router.delete("api/users/:id", (req, res) =>{
    db.User.destroy({where: {id: req.params.id}}).then( data => {
        res.json(data);
    });
});

router.put("/api/users/games/:id", async (req,res) => {
     let thisUser = await db.User.findOne({where : {id: req.params.id}});
    db.User.addGame(req.body.game)
    .then(data => {
        res.json(data);
    })
});
}
