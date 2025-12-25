const express = require("express");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Create Post
router.post("/", protect, async(req,res)=>{
  const post = await Post.create({
    title:req.body.title,
    content:req.body.content,
    author:req.user.id,
    status:req.body.status || "pending"
  });
  res.json(post);
});

// Public — Only Published
router.get("/", async(req,res)=>{
  const posts = await Post.find({ status:"published" })
  .populate("author","name");
  res.json(posts);
});

// My Posts
router.get("/mine", protect, async(req,res)=>{
  const posts = await Post.find({ author:req.user.id });
  res.json(posts);
});

// Comment
router.post("/:id/comment", protect, async(req,res)=>{
  const post = await Post.findById(req.params.id);
  post.comments.push({text:req.body.text,user:req.user.id});
  await post.save();
  res.json(post);
});

// Like
router.post("/:id/like", protect, async(req,res)=>{
 const post = await Post.findById(req.params.id);

 if(post.likes.includes(req.user.id))
  post.likes = post.likes.filter(l=>l!==req.user.id);
 else
  post.likes.push(req.user.id);

 await post.save();
 res.json(post);
});

module.exports = router;
