const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
const bcrypt = require("bcrypt");

//Sign up
router.post("/signup",(req,res)=>{
    db.User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        uname: req.body.uname,
        pw: req.body.pword
    }).then(data=>{
    res.json(data);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// Login
router.post("/login",(req,res)=>{
    db.User.findOne({ //finds user
    where: {
        uname:req.body.uname
    }
}).then(userData=>{
    if(!userData){
        req.session.destroy(); //resets cookie after failed 
        res.json(404).send("User not found.")
    } else {
        if(bcrypt.compareSync(req.body.pw, userData.pw)){
            req.session.user={
                id: userData.id,
                uname: userData.uname
            }
            //authenticate user
            res.json(userData);
        } else {
            req.session.destroy(); //resets cookie after failed 
            res.status(401).send("Incorrect password. Try again.")
        }
    }
    })
})

// Shows current session
router.get("/readsessions", (req,res)=>{
    res.json(req.session)
})

// Check if signed in or not
router.get("/secretclub", (req,res)=>{
    if(req.session.user){
        res.send(`Hello, ${req.session.user.uname}!`)
    } else {
        res.status(401).send("Please sign in!!")
    }
})


// Destroy = deletes existing cookies
router.get("/logout", (req, res)=>{
    req.session.destroy();
    res.send("Logged out.")
    res.redirect("/");
})

module.exports = router;
