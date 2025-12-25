const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({message:"No token"});

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if(err) return res.status(401).json({message:"Invalid Token"});
    req.user = decoded;
    next();
  });
};

const adminOnly = (req,res,next)=>{
  if(req.user.role !== "admin")
    return res.status(403).json({message:"Admin only"});
  next();
};

module.exports = { protect, adminOnly };
