const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user-model");
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
  db.Portfolio.findAll()
    .then((portfolios) => {
      res.json(portfolios);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ***************************************** C ****

router.post("/", (req, res) => {
  const userData = authenticateMe(req);
  if (!userData) {
    res.status(403).send("Please log in.");
  } else {
    db.Portfolio.create({
      name: req.body.name,
      category: req.body.category,
      bio: req.body.bio,
      materialUsed: req.body.materialUsed,
      forSale: req.body.forSale,
      UserId: userData.id,
    })
      .then((newPortfolio) => {
        res.json(newPortfolio);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// ***************************************** R ****
router.get("/portfolios", (req, res) => {
  db.Portfolio.findAll({
    include: [db.Gallery],
  })
    .then((portfolios) => {
      res.json(portfolios);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ***************************************** U ****
router.get("/:id/portfolios", (req, res) => {
  const userData = authenticateMe(req);

  db.Portfolio.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Gallery],
  })
    .then((portfolio) => {
      console.log(userData);
      console.log(portfolio);
      res.json({
        portfolio: portfolio,
        canEdit: userData && userData.id === portfolio.UserId,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ***************************************** D ****
router.delete("/:id", (req, res) => {
  const userData = authenticateMe(req);
  db.Portfolio.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((portfolio) => {
      if (portfolio.UserId === userData.id) {
        db.Portfolio.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then((delPortfolio) => {
            res.json(delPortfolio);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        res.status(403).send("Wrong portfolio.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
