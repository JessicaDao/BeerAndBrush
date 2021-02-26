const express = require("express");
const router = express.Router();
const db = require("../models");
const GalleryItem = require("../models/galleryItem-model");
const bcrypt = require("bcrypt");
const { jsxText } = require("@babel/types");



// ***************************************** C ****
router.post("/new",async (req,res)=>{
    newGalleryItem = await db.GalleryItem.create({
        name: req.body.name,
        category: req.body.category,
        bio: req.body.bio,
        materialUsed: req.body.materialUsed,
        forSale: req.body.forSale
    })

    newGalleryItem.catch(err => {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })

    res.json({
        data: newGalleryItem
    })
})

// ***************************************** R ****

router.get("/:galleryItem_id", async (req, res) => {
    let oneGalleryItem = await db.GalleryItem.findOne({
        where: {
            id: req.params.galleryItem_id
        }
    })

    oneGalleryItem.catch(err => {
        console.log(err);
        res.status(500).json({
            data:err
        })
    })
    
    res.json({
        data: oneGalleryItem
    })
})

router.get("/all", async (req, res) => {
    let allGalleries = await db.GalleryItem.findAll() 

    allGalleries.catch(err => {
        console.log(err);
        res.status(500).json({
            data:err
        })
    })

    res.json({
        data: allGalleries
    })
})

// ***************************************** U ****
router.post("/update/:galleryItem_id", async (req, res) => {
    let galleryItemToUpdate = await db.GalleryItem.update(req.body,
        {
            where: {
                id: req.params.galleryItem_id
            }
        })

    galleryItemToUpdate.catch(err => {
        console.log(err);
        res.status(500).json({
            data:err
        })
    })

    res.json({
        data: GalleryItemToUpdate
    })
})

// ***************************************** D ****
router.delete("/delete/:galleryItem_id", async (req, res) => {
    let galleryItemToDelete = await db.GalleryItem.destroy({
        where: {
            id: req.params.galleryItem_id
        }
    })

    galleryItemToDelete.catch(err => {
        console.log(err);
        res.status(500).json({
            data: err
        })
    })

    res.json({
        data: galleryItemToDelete,
        msg: "successfully deleted"
    })
})


module.exports = router;