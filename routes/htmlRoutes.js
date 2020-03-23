const express = require("express");
const router = express.Router();

const db = require("../models");
const passport = require("passport");
// html route file for page queries
const avatarArray = [{ name: 'Blue Meeple', image: '/assets/images/blueMeeple.jpg' }, { name: 'Red Meeple', image: '/assets/images/redMeeple.jpg' }, { name: 'Yellow Meeple', image: '/assets/images/yellowMeeple.jpg' }, { name: 'Black Meeple', image: '/assets/images/blackMeeple.jpg' }, { name: 'Pink Meeple', image: '/assets/images/pinkMeeple.jpg' }, { name: 'Green Meeple', image: '/assets/images/greenMeeple.jpg' }, { name: 'Maple Meeple', image: '/assets/images/canadianMeeple.jpg' }]

// Checks login status on pages that require login
function isLoggedInRequired(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}
// Checks login status on pages where login is optional
function isLoggedInOptional(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return next();
  }
}

// Create all our routes and set up logic within those routes where required.
module.exports = function (router) {
  router.get("/", isLoggedInOptional, (req, res) => {
    db.Game.findAll({ limit: 30 }).then(data => {
      let allGamesObject = {};
      if (req.user) {
        allGamesObject = {
          user: req.session.passport.user,
          games: data
        };
      }
      else {
        allGamesObject = {
          games: data
        };
      }

      res.render("index", allGamesObject);

    });
  });

  router.get("/page/:pagenum", isLoggedInOptional, (req, res) => {
    let offset = 30 * req.params.pagenum;
    db.Game.findAll({ offset: offset, limit: 30 }).then(data => {
      let allGamesObject = {};
      if (req.user) {
        allGamesObject = {
          user: req.session.passport.user,
          games: data
        };
      }
      else {
        allGamesObject = {
          games: data
        };
      }
      res.render("index", allGamesObject);
    });
  })

  router.get("/lfg", isLoggedInRequired, (req, res) => {
    res.render("lookingforgroup");
  });

  router.post("/search", (req, res) => {
    db.Game.findOne({
      where: {
        name: req.body.name
      }
    }).then(data => {
      let gameObject = {};
      if (req.user) {
        gameObject = {
          user: req.session.passport.user,
          game: data
        };
      }
      else {
        gameObject = {
          game: data
        };
      };
      res.render("game", gameObject);
    });
  });

  router.get("/games/:id", isLoggedInOptional, (req, res) => {
    db.Game.findOne({ where: { id: req.params.id } }).then(data => {
      let dataObject = {};
      if (req.user) {
        dataObject = {
          user: req.session.passport.user,
          game: data
        };
      }
      else {
        dataObject = {
          game: data
        };
      }
      res.render('game', dataObject);
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

  router.get("/user", isLoggedInRequired, (req, res) => {
    db.User.findOne({
      where: { id: req.session.passport.user }, include: [{
        model: db.Game,
        as: 'games',
        required: false,
        attributes: ['id', 'name', 'image_url', 'min_players', 'max_players', 'category'],

      }]
    }).then(thisUser => {
      thisUserObj = { user: thisUser }
      res.render("user", thisUserObj);
    });
  });

  router.get("/user/:id", isLoggedInRequired, (req, res) => {
    db.User.findOne({
      where: { id: req.params.id }, include: [{
        model: db.Game,
        as: 'games',
        required: false,
        attributes: ['id', 'name', 'image_url', 'min_players', 'max_players', 'category'],
      }]
    }).then(thatUser => {
      thatUserObj = { user: thatUser }
      res.render("otherUser", thatUserObj);
    });

  });

  router.get("/authfailed", (req, res) => {
    res.render("pleaseLogin");
  });

  //====log out== route===

  router.get("/logout", isLoggedInRequired, (req, res) => {
    req.session.destroy(function (err) {
      console.log("Logging Out");
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("username");
      res.render("logout");
    });
  });

  router.get("/game/rand", isLoggedInOptional, (req, res) => {
    console.log("Getting random game.")
    let random = Math.floor((Math.random() * 4994) + 1);
    db.Game.findOne({ where: { id: random } }).then(data => {
      let dataObject = {};
      if (req.user) {
        dataObject = {
          user: req.session.passport.user,
          game: data
        };
      }
      else {
        dataObject = {
          game: data
        };
      }
      res.render("game", dataObject);
    });
  });

  router.get('/rec', isLoggedInRequired, (req, res) => {
    db.User.findOne({
      where: { id: req.user }, include: [{
        model: db.Game,
        as: 'games',
        required: false,
        attributes: ['id', 'name', 'image_url', 'min_players', 'max_players', 'category'],
      }]
    }).then(data => {
      let userObj = { user: data }
      res.render('recommendation', userObj);
    })


  });

};

