const express = require("express");
const router = express.Router();

const db = require("../models");
const passport = require("passport");
// html route file for page queries

// Create all our routes and set up logic within those routes where required.
module.exports = function (router) {
  router.get("/", (req, res) => {
    db.Game.findAll({ limit: 10 }).then(data => {
      let allGamesObject = {
        games: data
      };
      res.render("index", allGamesObject);

    });
  });

  router.get("/lfg", (req, res) => {

    res.render("lookingforgroup");
  });


  router.post("/search", (req, res) => {
    console.log(req.body);
    db.Game.findOne({
      where: {
        names: req.body.name
      }
    }).then(data => {

      console.log(data);


      let gameObject = {
        games: data
      };
      res.render("game", gameObject);
    });

  });

  router.get("/games/:id", (req, res) => {
    console.log(req.params.id);
    db.Game.findOne({ where: { id: req.params.id } }).then(data => {
      res.render("game", data);
    });
  });


  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.get("/user/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  router.get("/signup", (req, res) => {
    res.render("signUp");
  });

  router.get("/user", isLoggedIn, (req, res) => {
    db.User.findOne({
      where: { id: req.session.passport.user }, include: [{
        model: db.Game,
        as: 'games',
        required: false,
        attributes: ['id', 'name', 'image_url', 'min_players', 'max_players', 'category'],

      }]
    }).then(thisUser => {


      res.render("user", thisUser);
    });

  });

  router.get("/authfailed", (req, res) => {
    res.render("pleaseLogin");
  });

  router.get("/addgames", (req, res) => {
    res.render("userAddGame");
  });

  //====log out== route===

  router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
      console.log("Logging Out");
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("username");
      res.render("logout");
    });
  });

  router.get("/game/rand", (req, res) => {
    console.log("Getting random game.")
    let random = Math.floor((Math.random() * 4994) + 1);
    db.Game.findOne({ where: { id: random } }).then(data => {
      res.render("game", data);
    });
  });
};
