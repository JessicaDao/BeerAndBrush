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
<<<<<<< HEAD
//working
router.post("/new", (req,res)=>{
=======

//working
router.post("/new", (req, res) => {
>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
    // let user = await db.User.findOne({
    //     where: {
    //         id: req.body.userId
    //     }
    // })
<<<<<<< HEAD
    console.log(req.body) 
=======
    console.log("********************")
    console.log(req.body)
>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
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
<<<<<<< HEAD
=======

>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
    // res.json({
    //     data: newProject
    // })
})
<<<<<<< HEAD
// ***************************************** R ****
=======



// ***************************************** R ****

>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
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
<<<<<<< HEAD
        msg: "Project found."
    })
})
//TODO: Do we need a findAll option? Would that be specific to user id as well?
// ***************************************** U ****
//not working
router.put("/update/:project_id", async (req, res) => {
    let projectUpdate = await db.Project.update(req.body, {
=======
        msg: "project found"
    })
})

//TODO: Do we need a findAll option? Would that be specific to user id as well?

// ***************************************** U ****

//not working
router.put("/update/:project_id", async (req, res) => {
    let projectUpdate = await db.Project.update(req.body, {

>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
        where: {
            id: req.params.project_id
        }
    })
    res.json({
        data: projectUpdate,
<<<<<<< HEAD
        msg:"Project updated."
    })
})
// ***************************************** D ****
//not working
router.delete("delete/:project_id", async (req, res) => {
    let projectDelete = await db.Project.destroy({
=======
        msg: "project updated"
    })
})

// ***************************************** D ****

//not working
router.delete("delete/:project_id", async (req, res) => {
    let projectDelete = await db.Project.destroy({

>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
        where: {
            id: req.params.project_id
        }
    })
    res.json({
        data: projectDelete,
<<<<<<< HEAD
        msg: "Project deleted."
    })
})
=======
        msg: "project deleted"
    })
})


>>>>>>> 1fb823839fa775dd28e2f8f3cbee7d953c13e710
module.exports = router;