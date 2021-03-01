const express = require("express");
const router = express.Router();
const db = require("../models");
const GalleryItem = require("../models/gallery-model");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");



// ***************************************** C ****
router.post("/new", (req, res) => {
    db.Project.create({
        name: req.body.name,
        dateStarted: req.body.dateStarted,
        dateFinished: req.body.dateFinished,
        description: req.body.description,
        materialUsed: req.body.materialUsed,
        category: req.body.category,
        forSale: req.body.forSale,
    }).then(resp => {
        console.log(resp);
        res.json({
            data: resp
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })
})

// ***************************************** R ****

router.get("/:id/gallery", (req, res) => {
    db.Project.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Project]
    }).then(resp => {
        console.log(resp);
        res.json({
            data: resp
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })
})

router.get("/all", (req, res) => {
    db.Project.findAll()
        .then(resp => {
            console.log(resp);
            res.json({
                data:resp
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                data: err
            })
        })
})

// ***************************************** U ****
router.post("/update/:gallery", (req, res) => {
    db.GalleryItem.update(req.body,
        {
            where: {
                id: req.params.galleryItemId
            }
        }).then(resp => {
            res.json({
                data: resp
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                data: err
            })
        })
})

// ***************************************** D ****
router.delete("/delete/:galleryItemId", (req, res) => {
    db.GalleryItem.destroy({
        where: {
            id: req.params.galleryItemId
        }
    }).then(resp => {
        console.log(resp);
        res.json({
            data: resp
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })
})


module.exports = router;