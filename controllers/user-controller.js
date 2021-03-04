const express = require("express");
const router = express.Router();
const db = require("../models");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateMe = (req) => {
  console.log("we are athorized");
  let token;
  if (!req.headers) {
    token = false;
  } else if (!req.headers.authorization) {
    token = false;
  } else {
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
};

// Home Page
// router.get("/", (req, res) => {
//   res.send("Currently on the home page.");
// });

// Registration
router.post("/register", (req, res) => {
  db.User.create(req.body)
    .then((newUser) => {
      const token = jwt.sign(
        {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          uname: req.body.uname,
          pw: req.body.pw,
          isArtist: req.body.isArtist,
        },
        "bananas",
        {
          expiresIn: "2h",
        }
      );
      return res.json({ user: newUser, token });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login
router.post("/login", (req, res) => {
  db.User.findOne({
    //finds user
    where: {
      uname: req.body.uname,
    },
  })
    .then((user) => {
      if (!user) {
        res.json(404).send("User not found.");
      } else if (bcrypt.compareSync(req.body.pw, user.pw)) {
        const token = jwt.sign(
          {
            id: user.id,
            uname: user.uname,
            isArtist: user.isArtist,
          },
          "bananas",
          {
            expiresIn: "2h",
          }
        );
        // return res.json({ user, token })
        return res.json({
          data: {
            token,
          },
          msg: "succezzfulzzz login",
        });
      } else {
        res.status(401).send("Incorrect password. Try again.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


// GET all users
router.get("/users", (req, res) => {
  db.User.findAll()
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        err,
      });
    });
});

// ***************************************** U ****

router.post("/update/:id", (req, res) => {
  db.User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updateUser) => {
      res.json(updateUser);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});

// ***************************************** D ****

router.delete("/delete/:id", (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delUser) => {
      res.json(delUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// **********************************************

// JWT secretclub
router.get("/secretclub", (req, res) => {
  console.log("secretclub entry");
  let tokenData = authenticateMe(req);
  console.log("tokenData" + tokenData);
  if (tokenData) {
    db.User.findOne({
      where: {
        id: tokenData.id,
      },
    })
      .then((user) => {
        console.log("user" + user);
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(403).send("auth failed");
  }
});

router.get("/get/:id", (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((resp) => {
      console.log(resp);
      res.json({
        data: resp,
      });
    })
    .catch((err) => {
      console.log("^^^^^^^^^^");
      console.log(err);
      console.log("^^^^^^^^^^");
      res.status(500).json({
        data: err,
      });
    });
})

// GET active user
router.get("/", (req, res) => {
  const userData = authenticateMe(req);
  if (!userData) {
    res.status(403).send("Please login.");
  } else {
    db.User.findOne({
      where: {
        id: userData.id,
      },
    })
      .then((resp) => {
        console.log(resp);
        res.json({
          data: resp,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          data: err,
        });
      });
  }
})

module.exports = router;

