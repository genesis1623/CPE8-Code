const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {

    if (err) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;