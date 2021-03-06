const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
// const user = require("../models/user-model");
// const bcrypt = require("bcrypt");


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
    let loggedinUser;
  if (token) {
    loggedinUser = jwt.verify(token, "bananas", (err, data) => {
      if (err) {
        return false;
      } else {
        return data;
      }
    });
  }
  return loggedinUser;
}
// ***************************************** C ****
router.post("/new", (req, res) => {
    const userData = authenticateMe(req);
    if (!userData) {
        res.status(403).send("Please login.");
    } else {
        db.Class.create({
            name: req.body.name,
            level: req.body.level,
            date: req.body.date,
            time: req.body.time,
            duration: req.body.duration,
            location: req.body.location,
            recurring: req.body.recurring,
            // price: req.body.price,
            UserId: userData.id
            // UserId: req.body.UserId
        }).then(resp => {
            res.json({
                // data: newClass,
                data: resp,
                msg: "successful"
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
})

// ***************************************** R ****
// Finds all classes
router.get("/all", (req, res) => {
    // db.Class.findAll().then(data => {
    //     res.json(data)
    db.Class.findAll()
    .then(resp => {
        console.log("running then");
        console.log(resp);
        res.json({
            data: resp
        })
    }).catch(err => {
        console.log("running catch");
        console.log(err);
        res.status(500).json(err);
    })
})

// Finds specific instructor classes
router.get('/:id', (req, res) => {
    db.Class.findAll({
        where: {
            UserId: req.params.id
        }
    }).then(resp => {
        console.log(resp);
        res.json({
            data: resp
        })
    }).catch(err => {
        console.log(err);
    })
})

// ***************************************** U ****
// router.put("/classes/update/:id", (req, res) => {
//     if (!req.session.user) {
//         res.status(401).send("Unable to retrieve.")
//     } else {
//         let classObj = {};
//         if (req.body.name !== null && req.body.name !== "") {
//             classObj.name = req.body.name;
//         }
//         if (req.body.level !== null && req.body.level !== "") {
//             classObj.level = req.body.level;
//         }
//         if (req.body.date !== null && req.body.date !== "") {
//             classObj.date = req.body.date;
//         }
//         if (req.body.time !== null && req.body.time !== "") {
//             classObj.time = req.body.time;
//         }
//         if (req.body.duration !== null && req.body.duration !== "") {
//             classObj.duration = req.body.duration;
//         }
//         if (req.body.recurring !== null && req.body.recurring !== "") {
//             classObj.recurring = req.body.recurring;
//         }
//         if (req.body.location !== null && req.body.location !== "") {
//             classObj.location = req.body.location;
//         }
//         if (req.body.price !== null && req.body.price !== "") {
//             classObj.price = req.body.price;
//         }
//         db.classDetails.update(classObj, {
//             where: {
//                 userId: req.session.user.id,
//                 id: req.params.id
//             }
//         }).then(data => {
//             res.json(data);
//         }).catch(err => { res.status(500).send(err.message); });

//     }
// });



// ***************************************** D ****

router.delete("/:id", (req, res) => {
    const userData = authenticateMe(req);
    db.Class.findOne({
        where: {
            id: req.params.id
        }
    }).then(classObj => {
        if (classObj.UserId === userData.id) {
            db.Class.destroy({
                where: {
                    id: req.params.id
                }
            }).then(delClass => {
                res.json(delClass)
            }).catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        } else {
            res.status(403).send("Cannot delete.")
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;

