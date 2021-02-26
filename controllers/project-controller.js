const express = require("express");
const router = express.Router();
const db = require("../models");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");


// ***************************************** C ****

router.post("/new", (req, res) => {
    db.Project.create({
        name: req.body.name,
        category: req.body.category,
        bio: req.body.bio,
        materialUsed: req.body.materialUsed,
        forSale: req.body.forSale
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    })
})



// ***************************************** R ****

router.get("/:project_id", async (req, res) => {
    let findProject = await db.Project.findOne(
        {
            where: {
                id: req.params.project_id
            }
        })
    res.json({
        data: findProject,
        msg: "project found"
    })
})

//TODO: Do we need a findAll option? Would that be specific to user id as well?

// ***************************************** U ****

router.put("/update/:project_id", async (req, res) => {
    let projectUpdate = await db.Project.update(req.body, {

        where: {
            id: req.params.project_id
        }
    })
    res.json({
        data: projectUpdate,
        msg: "project updated"
    })
})

// ***************************************** D ****

router.delete("delete/:project_id", async (req, res) => {
    let projectDelete = await db.Project.destroy({

        where: {
            id: req.params.project_id
        }
    })
    res.json({
        data: projectDelete,
        msg: "project deleted"
    })
})


module.exports = router;