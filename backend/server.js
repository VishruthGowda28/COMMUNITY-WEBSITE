const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

// ✅ CREATE APP FIRST
const app = express();

// ✅ THEN MIDDLEWARES
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ✅ THEN UPLOADS STATIC
app.use("/uploads", express.static("uploads"));   // <-- must be AFTER app is created

// ✅ THEN ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/profile", require("./routes/profileRoutes")); // if added

// ✅ START SERVER
app.listen(process.env.PORT || 5000, ()=> console.log("Server running on 5000"));
