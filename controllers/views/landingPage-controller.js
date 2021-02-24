const express = require("express");
const router = express.Router();
const db = require("../../models");
const user = require("../../models/user");


router.get("/login", (req,res)=>{
    console.log("Test");
    res.render("login")
})

router.get("/signup", (req,res)=>{
    res.render("signup")
})

// router.get("/addArt", (req, res) => {
//     if(!req.session.user){
//         res.redirect("/login")
//     } else {
//         res.render("addArt", {
//             user: req.session.user
//         })
//     }
// })



module.exports = router;
