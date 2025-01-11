const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = protect;
