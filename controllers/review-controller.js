const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");


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


router.post("/",(req,res)=>{
  const userData = authenticateMe(req);
  if (!userData) {
        res.status(403).send("Please login.")
    } else {
    db.Review.create({
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
router.delete("/api/reviews/delete/:id", (req, res) => {
    if (!req.session.user) {
      res.status(401).send("Retry.")
    } else {
      db.Review.destroy({
        where: {
          userId: req.session.user.id,
          id: req.params.id
        }
      }).then(data => {
        res.json(data);
        res.redirect("/reviews");
      }).catch(err => { res.status(500).send(err.message); });
    }
  });
module.exports = router;