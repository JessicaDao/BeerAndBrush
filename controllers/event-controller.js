const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");
const classDetails = require("../models/classes");

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
router.post("/",(req,res)=>{
    const userData = authenticateMe(req);
    if(!userData){
        res.status(403).send("login first man");
    } else {
        db.Classes.findOne({
            where:{
                id:req.body.classes
            }
        }).then(classes=>{
            if(classes.UserId===userData.id){
                db.Class.create({
        name: req.body.name,
        level: req.body.level,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        price: req.body.price,
        location: req.body.location,
        price: req.body.price,
        reviews: req.body.reviews,
        UserId: userData.id
    }).then(newClass=>{
        res.json(newClass)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
} else {
    res.status(403).send("Wrong profile.")
}
}).catch(err=>{
console.log(err);
res.status(500).json(err);
})

}
})


// ***************************************** R ****
router.get("/",(req,res)=>{
    db.Classes.findAll().then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// ***************************************** U ****
router.put("/classes/update/:id",(req,res) => {
    if (!req.session.user){
        res.status(401).send("Unable to retrieve.")
    } else {
        let classObj = {};
        if(req.body.name !== null && req.body.name !== ""){
            classObj.name = req.body.name;
        }
        if(req.body.level !== null && req.body.level !== ""){
            classObj.level = req.body.level;
        }
        if(req.body.date !== null && req.body.date !== ""){
            classObj.date = req.body.date;
        }
        if(req.body.time !== null && req.body.time !== ""){
            classObj.time = req.body.time;
        }
        if(req.body.duration !== null && req.body.duration !== ""){
            classObj.duration = req.body.duration;
        }
        if(req.body.recurring !== null && req.body.recurring !== ""){
            classObj.recurring = req.body.recurring;
        }
        if(req.body.price !== null && req.body.price !== ""){
            classObj.price = req.body.price;
        }
        if(req.body.location !== null && req.body.location !== ""){
            classObj.location = req.body.location;
        }
        if(req.body.reviews !== null && req.body.reviews !== ""){
            classObj.reviews = req.body.reviews;
        }
      db.classDetails.update(classObj, {
        where: {
          userId: req.session.user.id,
          id: req.params.id
        }
      }).then(data => {
        res.json(data);
      }).catch(err => { res.status(500).send(err.message); });
  
    }
  });

// ***************************************** D ****

router.delete("/:id",(req,res)=>{
    const userData = authenticateMe(req);
    db.Class.findOne({
        where:{
            id:req.params.id
        }
    }).then(classObj=>{
        if(classObj.UserId===userData.id){
            db.Class.destroy({
                where:{
                    id:req.params.id
                }
            }).then(delClass=>{
                res.json(delClass)
            }).catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
        } else {
            res.status(403).send("not your fish")
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;
