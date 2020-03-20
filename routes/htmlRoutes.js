const express = require("express");
const router = express.Router();
const db = require("../models")
const passport = require('passport');
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

router.get("/search/:search", (req, res) => {
  db.Game.findAll({where: {
    names: req.params.search,
  }}).then(data => {
    console.log("--------------", data)
    res.render("game", data);
  });
});



// router.get("/search"), (req, res) =>

<<<<<<< HEAD
router.get("/games/:id", (req, res) => {
  console.log(req.params.id)
  db.Game.findOne({where: {
    id: req.params.id
  }}).then( data => {
    console.log("!!!!!!!!!!!!!!!!!", data);
    res.render("game", data)
=======
  router.get("/games/:id", (req, res) => {
    console.log(req.params.id)
    db.Game.findOne({ where: { id: req.params.id } }).then(data => {
      res.render("game", data)
    })
>>>>>>> d4850f2fed7b7129ddd6cfa0e93f235084995556
  })
})

<<<<<<< HEAD
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req,res) => {
  res.render("signUp");
})
=======
  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.get("/user/login", passport.authenticate('local'), (req,res) => {
  res.json(req.user);

  })

  router.get("/signup", (req, res) => {
    res.render("signUp");
  })

  router.get("/user", (req, res) => {
   let thisUser = req.session.passport.user;
    db.User.findOne({ where: { id: thisUser }, Include: [db.Game] }).then(thisUser => {      
      res.render("user", thisUser);
    });
>>>>>>> d4850f2fed7b7129ddd6cfa0e93f235084995556

router.get("/user/:id",  (req,res) => {
  db.User.findOne({where: {id: req.params.id}, Include: [db.Game] }).then(thisUser => {
    // console.log(thisUser)
    res.render("user", thisUser);
    // res.json(thisUser);
  });

});


<<<<<<< HEAD
router.get("/authfailed", (req, res) => {
  res.render("pleaseLogin")
})

router.get("/addGames", (req, res) => {
  router.get("/", (req,res) => {
    db.Game.findAll({limit : 10}).then(data => {
      
      let allGamesObject = {
        games: data
    
      };
      //userAddGames?
  res.render("userAddGames", allGamesObject)
})
  })
=======
  router.get("/addgames", (req, res) => {  
        res.render("userAddGame")
      })
    
>>>>>>> d4850f2fed7b7129ddd6cfa0e93f235084995556

})
}


