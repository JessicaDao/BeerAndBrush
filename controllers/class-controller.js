const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
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
// ***************************************** C ****
router.post("/new", (req, res) => {
    // db.
})

// ***************************************** R ****

// ***************************************** U ****

// ***************************************** D ****

module.exports = router;