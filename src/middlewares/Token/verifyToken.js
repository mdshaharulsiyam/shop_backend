const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../../config/defaults");
const AuthModel = require("../../Models/authModel");

// Modify verifyToken to accept an array of allowed roles
const verifyToken = (allowedRoles = []) => async (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  if (!tokenWithBearer) {
    return res.status(403).send({ success: false, message: "Forbidden access" });
  }
  if (!tokenWithBearer.startsWith("Bearer ")) {
    return res.status(401).send({ success: false, message: "Unauthorized access" });
  }
  const token = tokenWithBearer.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized access" });
    }

    // Retrieve the user by ID from the decoded token
    const user = await AuthModel.findById(decoded?.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    // Check if the user is blocked
    if (user.block) {
      return res.status(401).send({ success: false, message: "You are blocked by admin" });
    }

    // Check if the user's role is included in the allowedRoles array
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return res.status(403).send({ success: false, message: "Access denied: insufficient permissions" });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyToken;
