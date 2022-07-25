const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const verifyJWT = async (req, res, next) => {
  const nonSecurePaths = ["/", "/login", "/register"];
  if (nonSecurePaths.includes(req.path)) return next();

  const cookies = cookie.parse(req.headers.cookie);

  if (!cookies.jwt) {
    return res.status(403).send("You don't have a token");
  }

  try {
    const decode = jwt.verify(cookies.jwt, "mysecret");
    req.user = decode;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  next();
};

module.exports = {
  verifyJWT,
};
