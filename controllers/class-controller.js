const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");
const classDetails = require("../models/class-details");


router.get("/", (req, res)=>{
    db.classDetails.findAll().then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err);
    })
})
// ***************************************** C ****
router.post("/", (req, res)=>{
    if(!req.session.user){
        res.status(401).send("Please login.")
    }else {
    db.classDetails.create({
        name: req.body.name,
        level: req.body.level,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        price: req.body.price,
        location: req.body.location,
        price: req.body.price,
        reviews: req.body.reviews,
        UserId: req.session.user.id
        }).then(data=>{
            res.json(data);
            }).catch(err=>{
                res.status(500).json(err);
            })
    }
})
// ***************************************** R ****



// ***************************************** U ****

// ***************************************** D ****
router.delete("classes/delete/:id",(req,res)=>{
 if (!req.session.user) {
    res.status(401).send("Unable to retrieve.")
  } else {
    db.classDetails.destroy({
      where: {
        userId: req.session.user.id,
        id: req.params.id
      }
    }).then(data => {
      res.json(data);
      res.redirect("/classes");
    }).catch(err => { res.status(500).send(err.message); });
  }

});


module.exports = router;