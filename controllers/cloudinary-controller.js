const express = require("express");
const router = express.Router();
const db = require("../models");

const User = require("../models/user-model"); 
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// Cloudinary post
router.post("/", upload.single("image"), async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
       // Create new user
      let user = new User({
        name: req.body.name,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // Save user
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }}); 
   module.exports = router;

   //Cloudinary delete
router.delete("/:id", async (req, res) => {
    try {
      // Find user by id
      let user = await User.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
      // Delete user from db
      await user.remove();
      res.json(user);
    } catch (err) {
      console.log(err);
    }});
