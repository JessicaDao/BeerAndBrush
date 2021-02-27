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

// ***************************************** C ****
//working
router.post("/new", (req,res)=>{
    // let user = await db.User.findOne({
    //     where: {
    //         id: req.body.userId
    //     }
    // })
    console.log(req.body) 
    db.Project.create({
        name: req.body.name,
        category: req.body.category,
        UserId: req.body.UserId,
        bio: req.body.bio,
        materialUsed: req.body.materialUsed,
        forSale: req.body.forSale
    }).then(resp => {
        res.json({
            data: resp
        })
    }).catch(err => {
        res.status(500).json(err);
    })
    // res.json({
    //     data: newProject
    // })
})
// ***************************************** R ****
//working
router.get("/:project_id", async (req, res) => {
    let findProject = await db.Project.findOne(
        {
            where: {
                id: req.params.project_id
            }
        })
    res.json({
        data: findProject,
        msg: "Project found."
    })
})
//TODO: Do we need a findAll option? Would that be specific to user id as well?
// ***************************************** U ****
//not working
router.put("/update/:project_id", async (req, res) => {
    let projectUpdate = await db.Project.update(req.body, {
        where: {
            id: req.params.project_id
        }
    })
    res.json({
        data: projectUpdate,
        msg:"Project updated."
    })
})
// ***************************************** D ****
//not working
router.delete("delete/:project_id", async (req, res) => {
    let projectDelete = await db.Project.destroy({
        where: {
            id: req.params.project_id
        }
    })
    res.json({
        data: projectDelete,
        msg: "Project deleted."
    })
})
module.exports = router;
