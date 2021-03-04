const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user-model");
const bcrypt = require("bcrypt");


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
  db.Profile.findAll()
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
    res.status(403).send("Please login.");
  } else {
    db.Profile.create({
      bio: req.body.bio,
      UserId: userData.id,
    })
      .then((newProfile) => {
        res.json(newProfile);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// ***************************************** R ****
router.get("/profile", (req, res) => {
  db.Portfolio.findAll({
    include: [db.Project, db.Class],
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
router.get("/:id/profile", (req, res) => {
  const userData = authenticateMe(req);

  db.Profile.findOne({
    where: {
      id: req.params.id,
    }
  })
    .then((profile) => {
      console.log(userData);
      res.json({
        profile: profile,
        canEdit: userData && userData.id === profile.UserId,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


////// Do we need delete profile? Shouldn't profile always exist, only can be edited?
// ***************************************** D ****
// router.delete("/:id", (req, res) => {
//   const userData = authenticateMe(req);
//   db.Profile.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((profile) => {
//       if (profile.UserId === userData.id) {
//         db.Profile.destroy({
//           where: {
//             id: req.params.id,
//           },
//         })
//           .then((delProfile) => {
//             res.json(delProfile);
//           })
//           .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//           });
//       } else {
//         res.status(403).send("Wrong profile.");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
