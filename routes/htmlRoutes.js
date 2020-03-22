const express = require("express");
const router = express.Router();

const db = require("../models");
const passport = require("passport");
// html route file for page queries
const avatarArray = [{ name: 'Blue Meeple', image: '/assets/images/blueMeeple.jpg' }, { name: 'Red Meeple', image: '/assets/images/redMeeple.jpg' }, { name: 'Yellow Meeple', image: '/assets/images/yellowMeeple.jpg' }, { name: 'Black Meeple', image: '/assets/images/blackMeeple.jpg' }, { name: 'Pink Meeple', image: '/assets/images/pinkMeeple.jpg' }, { name: 'Green Meeple', image: '/assets/images/greenMeeple.jpg' }, { name: 'Maple Meeple', image: '/assets/images/canadianMeeple.jpg' }]
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}
function indexLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return next();
  }
}

// Create all our routes and set up logic within those routes where required.
module.exports = function (router) {
  router.get("/", indexLoggedIn, (req, res) => {
    db.Game.findAll({ limit: 30 }).then(data => {

      let allGamesObject = {
        games: data
      };
      res.render("index", allGamesObject);

    });
  });

  router.get("/lfg", isLoggedIn, (req, res) => {

    res.render("lookingforgroup");
  });


  router.post("/search", (req, res) => {
    console.log(req.body);
    db.Game.findOne({
      where: {
        name: req.body.name
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
    let avatarObj = { meeple: avatarArray }
    res.render("signUp", avatarObj);
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
