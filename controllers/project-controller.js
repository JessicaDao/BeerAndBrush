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
router.post("/new", (req, res) => {
    db.Project.create({
        title: req.body.title,
        artistName: req.body.artistName,
        dateStarted: req.body.dateStarted,
        dateFinished: req.body.dateFinished,
        description: req.body.description,
        materialUsed: req.body.materialUsed,
        category: req.body.category,
        forSale: req.body.forSale
    }).then(resp => {
        res.json({
            data: resp
        })
    }).catch(err => {
        res.status(500).json(err);
    })
})

// ***************************************** R ****
// Route to show public gallery items

router.get("/gallery", async (req, res) => {
    let findProject = await db.Project.findAll(
        {
            where: {
                isPublic: true
            }
        })
    res.json({
        data: findProject,
        msg: "Gallery found."
    })
})

router.get("/:project_id", async (req, res) => {
    let findProject = await db.Project.findOne(
        {
            where: {
                id: req.params.project
            }
        })
    res.json({
        data: findProject,
        msg: "Project found."
    })
})


// Do we need a findAll option? Would that be specific to user id as well?

// ***************************************** U ****
//working
router.put("/update/:project_id", (req, res) => {
    db.Project.update(req.body, {
        where: {
            id: req.params.project_id
        }
    }).then(resp => {
        res.json({
            data: resp,
            msg: "Project updated."
        })
    }).catch(err => {
        res.status(500).json(err);
    })


    // res.json({
    //     data: projectUpdate,
    //     msg: "Project updated."
    // })
})
// ***************************************** D ****
router.delete("/delete/:project_id", (req, res) => {
    const userData = authenticateMe(req);
    db.Project.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((project) => {
        if (project.UserId === userData.id) {
          db.Project.destroy({
            where: {
              id: req.params.id,
            },
          })
            .then((delProject) => {
              res.json(delProject);
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
