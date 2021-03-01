const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");

const authenticateMe = (req) => {
  let token = false;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
    token = req.headers.authorization.split(" ")[1];
  }
  let data = false;
  if (token) {
    data = jwt.verify(token, "bananas", (err, data) => {
      if (err) {
        return false;
      } else {
        return data;
      }
    });
  }
  return data;
};

router.get("/", (req, res) => {
  db.Review.findAll()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/reviews", (req, res) => {
//   db.Review.findAll({
//       include: [db.Review]
//   }).then(reviews => {
//       res.json(reviews)
//   }).catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   })
// })

router.post("/", (req, res) => {
  const userData = authenticateMe(req);
  if (!userData) {
    res.status(403).send("Please login.");
  } else {
    db.Review
      .findOne({
        where: {
          id: req.body.review,
        },
      })
      .then((review) => {
        if (review.UserId === userData.id) {
          db.Review.create({
            class: req.body.name,
            reviewer: req.body.level,
            content: req.body.date,
            UserId: req.session.user.id,
          })
            .then((newReview) => {
              res.json(newReview);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
          }
})
}
});

router.delete("/:id", (req, res) => {
  const userData = authenticateMe(req);
  db.Review.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((review) => {
      if (review.UserId === userData.id) {
        db.Review.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then((delReview) => {
            res.json(delReview);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        res.status(403).send("Try again.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
