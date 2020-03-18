const express = require("express");
const router = express.Router();
const db = require("../models")
// html route file for page queries
// const User = require('../models/userModel.js');
// const Games = require('../models/gameModel.js');

// Create all our routes and set up logic within those routes where required.
module.exports = function(router){
router.get("/", (req,res) => {
  db.Game.findAll({limit : 10}).then(data => {
    
    let allGamesObject = {
      games: data
  
    };
    res.render("index", allGamesObject);

  });
});

router.get("/popular", (req, res) => {
  db.Game.findAll({order: {
    rank: 'ASC'
  }}).then(data => {
    let rankedGames = {
      games: data
      //limit?
    }
    res.render("index", rankedGames)
  });

});

router.post("/search", (req, res) => {
  console.log(req.body);
  db.Game.findOne({where: {
    names: req.body.name
  }}).then(data => {
    console.log(data)
    
    let gameObject = {
      games: data  
    };
    res.render("index", gameObject);
  });
})

router.get("/games/:id", (req, res) => {
  console.log(req.params.id)
  db.Game.findOne({where: {id: req.params.id}}).then( data => {
    console.log(data);
    res.render("game", data)
  })
})

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req,res) => {
  res.render("signUp");
})

router.get("/user/:id", async (req,res) => {
  db.User.findOne({where: {id: req.params.id}}).then(thisUser => {
    res.render("user", thisUser);
  });
 
});


router.get("/authfailed", (req, res) => {
  res.render("pleaseLogin")
})

router.get("/addGames", (req, res) => {
  router.get("/", (req,res) => {
    db.Game.findAll({limit : 10}).then(data => {
      
      let allGamesObject = {
        games: data
    
      };
  res.render("userAddGames", allGamesObject)
})
  })

})
}


