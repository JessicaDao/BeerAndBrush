const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");


// ***************************************** C ****
router.post("/",(req,res)=>{
    if(!req.session.user){
        res.status(401).send("Please login.")
    } else {
    db.reviews.create({
        class: req.body.name,
        reviewer: req.body.level,
        content: req.body.date,
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

module.exports = router;