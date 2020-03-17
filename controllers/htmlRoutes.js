const express = require("express");
const router = express.Router();
// html route file for page queries
const db = require('../models')

// Create all our routes and set up logic within those routes where required.
router.get("/", (req,res) => {
  Games.findAll({}).then(data => {
    let allGamesObject = {
      games: data
      // limit?
    };
    res.render("index", allGamesObject);
  });
});

router.get("/popular", (req, res) => {
  Games.findAll({order: {
    rank: 'ASC'
  }}).then(data => {
    let rankedGames = {
      games: data
      //limit?
    }
    res.render("index", rankedGames)
  });

});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/user/id:", async (req,res) => {
  let thisUser = User.findOne({where: {id: req.params.id}});
  res.render("userHome", thisUser);
});



