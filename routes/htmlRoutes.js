const express = require("express");
const router = express.Router();
const db = require("../models")
const passport = require('passport');
// html route file for page queries
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  } else {
      res.redirect("/login");
  }
}

// Create all our routes and set up logic within those routes where required.
module.exports = function (router) {
  router.get("/", (req, res) => {
    db.Game.findAll({ limit: 30 }).then(data => {

      let allGamesObject = {
        games: data

      };
      res.render("index", allGamesObject);

    });
  });

  router.get("/lfg", isLoggedIn, (req, res) => {

    res.render("lookingforgroup")
  });




  router.get("/games/:id", (req, res) => {
    console.log(req.params.id)
    db.Game.findOne({ where: { id: req.params.id } }).then(data => {
      res.render("game", data)
    })
  })

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.get("/user/login", passport.authenticate('local'), (req,res) => {
  res.json(req.user);

  })

  router.get("/signup", (req, res) => {
    res.render("signUp");
  })

  router.get("/user", isLoggedIn, (req, res) => {
    db.User.findOne({ where: { id: req.session.passport.user }, Include: [db.Game] }).then(thisUser => {  
      console.log(thisUser)    
      res.render("user", thisUser);
    });

  });


  router.get("/authfailed", (req, res) => {
    res.render("pleaseLogin")
  })

  router.get("/addgames", (req, res) => {  
        res.render("userAddGame")
      })
    

  
}


