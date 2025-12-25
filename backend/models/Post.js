const mongoose = require("mongoose");

const postSchema = mongoose.Schema({

 title:String,
 content:String,

 author:{ type:mongoose.Schema.Types.ObjectId, ref:"User" },

 comments:[{ text:String, user:String }],

 likes:[String],

 status:{
  type:String,
  default:"pending",
  enum:["draft","pending","published","rejected"]
 }

},{timestamps:true});

module.exports = mongoose.model("Post", postSchema);
