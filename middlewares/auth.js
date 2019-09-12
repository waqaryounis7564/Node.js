const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const privateKey = process.env.privateKey;
  const token = req.get("x-auth-token");
  if (!token) return res.status(401).send("token required");
  // here we use try catch if token is not valid ,it throws exception
  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send("invalid token");
  }
};
