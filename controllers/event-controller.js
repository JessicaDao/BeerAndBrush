const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");
const classDetails = require("../models/class-details");

// ***************************************** C ****
router.post("/",(req,res)=>{
    if(!req.session.user){
        res.status(401).send("Please login.")
    } else {
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
router.get("/",(req,res)=>{
    db.classDetails.findAll().then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// ***************************************** U ****
router.put("/classes/update/:id",(req,res) => {
    if (!req.session.user){
        res.status(401).send("Unable to retrieve.")
    } else {
        let classObj = {};
        if(req.body.name !== null && req.body.name !== ""){
            classObj.name = req.body.name;
        }
        if(req.body.level !== null && req.body.level !== ""){
            classObj.level = req.body.level;
        }
        if(req.body.date !== null && req.body.date !== ""){
            classObj.date = req.body.date;
        }
        if(req.body.time !== null && req.body.time !== ""){
            classObj.time = req.body.time;
        }
        if(req.body.duration !== null && req.body.duration !== ""){
            classObj.duration = req.body.duration;
        }
        if(req.body.recurring !== null && req.body.recurring !== ""){
            classObj.recurring = req.body.recurring;
        }
        if(req.body.price !== null && req.body.price !== ""){
            classObj.price = req.body.price;
        }
        if(req.body.location !== null && req.body.location !== ""){
            classObj.location = req.body.location;
        }
        if(req.body.reviews !== null && req.body.reviews !== ""){
            classObj.reviews = req.body.reviews;
        }
      db.classDetails.update(classObj, {
        where: {
          userId: req.session.user.id,
          id: req.params.id
        }
      }).then(data => {
        res.json(data);
      }).catch(err => { res.status(500).send(err.message); });
  
    }
  });

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