const express = require("express");
const router = express.Router();
const db = require("../models");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");



// ***************************************** C ****
router.post("/register",(req,res)=>{
    db.User.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        uname: req.body.uname,
        pw: req.body.pw
    }).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// ***************************************** R ****

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


// ***************************************** U ****



// ***************************************** D ****



// Login


// //Authentication - copy of Joe's demo, need edit
// app.post('/login', (req, res)=>{
//     db.User.findOne({
//         where:{
//             email:req.body.email
//         }
//     }).then(user=>{
//         if(!user){
//             return res.status(404).send("No such user.")
//         }
//         else if(bcrypt.compareSync(req.body.password,user.password)){
//             const token = jwt.sign({
//                 email:user.email,
//                 id:user.id
//             },"catscatscats",
//             {
//                 expiresIn:"2h"
//             })
//             return res.json({user,token})
//         }
//         else {
//             return res.status(403).send("Wrong Password!")
//         }
//     })
// })

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

// // Joe's demo, need edit
// app.get("/secretclub", (req,res)=>{
//     let token = false;
//     if(!req.headers){
//         token=false
//     }
//     else if(!req.headers.authorization){
//         token=false;
//     }
//     else {
//         token.headers.authorization.split(" ")[1];
//     }
//     if(!token){
//         res.status(403).send("Please sign in!")
//     }
//     else {
//         const data = jwt.verify(token, "catscatscats", (err,data)=>{
//             if(err){
//                 return false
//             } else {
//                 return data;
//             }
//         })
//         if(data){
//             res.send("Welcome, ${data.email}")
//         } else {
//             res.status(403).send("Auth failed.")
//         }
//     }
// })

// Destroy = deletes existing cookies
router.get("/logout", (req, res)=>{
    req.session.destroy();
    res.send("Logged out.")
    res.redirect("/");
})

module.exports = router;
