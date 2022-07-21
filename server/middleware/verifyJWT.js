const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const nonSecurePaths = ["/", "/login", "/register"];
  if (nonSecurePaths.includes(req.path)) return next();

  const token = req.body.token || req.query.token || req.get("authorization");

  if (!token) {
    return res.status(403).send("You don't have a token");
  }

  try {
    const decode = jwt.verify(token.trim().split(/\s+/)[1], "mysecret");
    req.user = decode;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  next();
};

module.exports = {
  verifyJWT,
};
