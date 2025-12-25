const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/stats", protect, adminOnly, async(req,res)=>{
  const users = await User.countDocuments();
  const posts = await Post.countDocuments();
  res.json({users,posts});
});

router.delete("/user/:id", protect, adminOnly, async(req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

router.put("/user/:id/suspend", protect, adminOnly, async(req,res)=>{
  const user = await User.findById(req.params.id);
  user.suspended = !user.suspended;
  await user.save();
  res.json({ message:"Updated", suspended:user.suspended });
});

// Pending posts
router.get("/pending-posts", protect, adminOnly, async(req,res)=>{
  const posts = await Post.find({ status:"pending" })
  .populate("author","name");
  res.json(posts);
});

// Approve
router.put("/post/:id/approve", protect, adminOnly, async(req,res)=>{
  await Post.findByIdAndUpdate(req.params.id,{ status:"published" });
  res.json("Approved");
});

// Reject
router.put("/post/:id/reject", protect, adminOnly, async(req,res)=>{
  await Post.findByIdAndUpdate(req.params.id,{ status:"rejected" });
  res.json("Rejected");
});

router.delete("/post/:id", protect, adminOnly, async(req,res)=>{
  await Post.findByIdAndDelete(req.params.id);
  res.json("Post Deleted");
});

module.exports = router;
