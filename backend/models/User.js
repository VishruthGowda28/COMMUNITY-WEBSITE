const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  name: String,
  email: { type: String, unique: true },
  password: String,
  bio: String,
  profilePic: String,

  visibility: { type: String, default: "public" },
  role: { type: String, default: "member" },

  suspended: { type: Boolean, default: false },

  resetToken: String,
  resetTokenExpire: Date

},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
