const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/me", protect, async(req,res)=>{
  const user = await User.findById(req.user.id);
  res.json(user);
});

router.get("/members", protect, async(req,res)=>{

  const me = await User.findById(req.user.id);

  if(me.role === "admin"){
    const users = await User.find().select("-password");
    return res.json(users);
  }

  const users = await User.find({ visibility:"public" }).select("-password");
  res.json(users);
});

module.exports = router;
