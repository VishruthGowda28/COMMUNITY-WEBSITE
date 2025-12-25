const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req,file,cb)=>{
    cb(null, Date.now() + "-" + file.originalname)
  }
});

const upload = multer({storage});

// Update Bio
router.put("/bio", protect, async(req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { bio: req.body.bio },
    { new:true }
  );
  res.json(user);
});

// Upload Profile Picture
router.post("/avatar", protect, upload.single("avatar"), async(req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePic: req.file.filename },
    { new:true }
  );
  res.json(user);
});

router.put("/visibility", protect, async(req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { visibility:req.body.visibility },
    { new:true }
  );
  res.json(user);
});

module.exports = router;
