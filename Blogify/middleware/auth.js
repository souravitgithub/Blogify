const { verifyToken } = require("../service/auth");

const checkForAuth = (req, res, next) => {
  const user = verifyToken(req.cookies.token);
  req.user = user;
  next();
};

module.exports = { checkForAuth };
