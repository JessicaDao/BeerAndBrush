const express = require("express");
const router = express.Router();
const db = require("../models");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");
const jwt = require("jsonwebtoken");

const authenticateMe = (req) => {
    let token = false;
    if (!req.headers) {
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, "bananas", (err, data) => {
            if (err) {
                return false;
            } else {
                return data
            }
        })
    }
    return data;
}

// Home Page
router.get("/", (req, res) => {
    res.send("Currently on the home page.")
})

// Registration
router.post("/register", (req, res) => {
    db.User.create(req.body).then(newUser => {
        const token = jwt.sign({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            uname: req.body.uname,
            pw: req.body.pw,
        }, "bananas",
            {
                expiresIn: "2h"
            })
        return res.json({ user: newUser, token })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Login
router.post("/login", (req, res) => {
    console.log("***********");
    console.log(req.body);
    db.User.findOne({ //finds user
        where: {
            uname: req.body.uname
        }
    }).then(user => {
        if (!user) {
            res.json(404).send("User not found.")
        } else if (bcrypt.compareSync(req.body.pw, user.pw)) {
            const token = jwt.sign({
                id: user.id,
                uname: user.uname
            }, "bananas",
                {
                    expiresIn: "2h"
                })
            return res.json({ 
                data:{
                    user,token
                },
                msg:"succezzfulzzz login"
             })
            // return res.json({ user, token })
        } else {
            res.status(401).send("Incorrect password. Try again.")
        }
    })
})

router.get("/:userId", (req, res) => {
    db.User.findOne({
        where: {
            id: req.params.userId
        }
    }).then(resp => {
        console.log(resp);
        res.json({
            data: resp
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })
})

router.get("/all", (req, res) => {
    db.User.findAll()
        .then(resp => {
            console.log(resp);
            res.json({
                data: resp
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                data: err
            })
        })
})

// ***************************************** U ****

router.post("/update/:userId", (req, res) => {
    db.User.update(req.body,
        {
            where: {
                id: req.params.userId
            }
        }).then(resp => {
            console.log(resp);
            res.json({
                data: resp
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                data: err
            })
        })
})

// ***************************************** D ****

router.delete("/delete/:user_id", (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(resp => {
        console.log(resp);
        res.json({
            data: resp,
            msg: "successfully deleted"
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })
})

// **********************************************

// JWT secretclub
router.get("/secretclub", (req, res) => {
    let tokenData = authenticateMe(req);
    if (tokenData) {
        db.User.findOne({
            where: {
                id: tokenData.id
            }
        }).then(user => {
            res.json(user)
        }).catch(err => {
            res.status(500).json(err);
        })
    } else {
        res.status(403).send('auth failed')
    }
})

module.exports = router;