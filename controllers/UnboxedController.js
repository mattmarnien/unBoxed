var express = require("express");
var router = express.Router();
// General controller format for whatever routes we need/ Can split off sub-controllers for more varied routes if needed
// Import the model (show.js) to use its database functions.
// var show = require("../models/showModel.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req,res) => {
  show.all(data => {
    var allShowObject = {
      shows: data
    };
    res.render("index", allShowObject);
  });
});

// router.get("/archive", (req, res) => {
//     show.all(data => {
//         var allShowObject = {
//             shows: data
//         };
//         res.render("archive", allShowObject);
//     })
// })

// router.put("/api/shows/:id", (req,res) => {
//     show.update('watched', req.params.id, 1, data => {
//         res.json(data);
//     })
// })

// router.post("/api/shows", (req,res) => {
//     show.create(req.body.name, data =>{
//       res.json(data);
//     })

// })
// router.put("/api/shows/archive/:id", (req,res) => {
//     show.update('archived', req.params.id, 1, data => {
//         res.json(data);
//     })
// })

// router.put("/api/shows/unArchive/:id", (req,res) => {
//     show.update('archived', req.params.id, 0, data => {
//         show.update('watched', req.params.id, 0, data => {
//             res.json(data);
//         })
//     })
// })

// router.delete("/api/shows/delete/:id", (req,res) => {
//     console.log(req.params.id);
//     show.delete(req.params.id, data => {
//         res.json(data);
//     })
// })


module.exports = router;