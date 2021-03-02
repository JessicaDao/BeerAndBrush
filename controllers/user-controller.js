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
            isArtist: req.body.isArtist
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
            // return res.json({ user, token })
            return res.json({ 
                data:{
                    user,token
                },
                msg:"succezzfulzzz login"
             })
        } else {
            res.status(401).send("Incorrect password. Try again.")
        }
    })
})

// GET one user
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

// GET all users
router.get("/users", (req, res) => {
    db.User.findAll()
        .then(users => {
            console.log(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                err
            })
        })
})

// ***************************************** U ****

router.post("/update/:id", (req, res) => {
    db.User.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }).then(updateUser => {
            res.json(updateUser)
        }).catch(err => {
            res.status(500).send(err)
        })
})

// ***************************************** D ****

router.delete("/delete/:id", (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser)
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
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