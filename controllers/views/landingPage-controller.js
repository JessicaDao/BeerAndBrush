const express = require("express");
const router = express.Router();
const db = require("../../models");
const user = require("../../models/user");


router.get("/check_login", (req,res)=>{
    // TODO: steps to login
    // > all data should be found inside the req.body 
    // > check for unique email
    // > compare password given with hash
    // > return results

    res.json({
        status: 200,
        msg: "credentials authorized"
    })
})

router.get("/register_new_user", (req,res)=>{
    res.json({
        status: 200,
        msg: "successfully registered a new user"
    })
})

module.exports = router;
