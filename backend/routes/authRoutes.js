const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const crypto = require("crypto");

router.post("/register", async(req,res)=>{
  const {name,email,password} = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({name,email,password:hashed});
  res.json(user);
});

router.post("/login", async(req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(404).json("User not found");

  if(user.suspended)
    return res.status(403).json("Account Suspended");

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(401).json("Wrong password");

  const token = jwt.sign(
    {id:user._id,role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
  );

  res.json({token,user});
});

router.post("/forgot-password", async(req,res)=>{
  const { email } = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(404).json("User not found");

  const token = crypto.randomBytes(20).toString("hex");

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;  // 10 mins
  await user.save();

  const resetLink = `http://localhost:3000/reset/${token}`;

  res.json({
    message: "Password reset link generated",
    resetLink   // Show link directly
  });
});

router.post("/reset-password/:token", async(req,res)=>{
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpire: { $gt: Date.now() }
  });

  if(!user) return res.status(400).json("Invalid or expired token");

  const hashed = await bcrypt.hash(req.body.password,10);

  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.json("Password Updated Successfully");
});

module.exports = router;
