const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ errorMessage: "invalid token" });
    }
    const token = authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, "SECRETTOKEN");

    if (!decodeToken) {
      return res.status(401).json({ errorMessage: "invalid token" });
    }
    req.userId = decodeToken.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = isAuth;
