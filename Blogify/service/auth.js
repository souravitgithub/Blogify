const jwt = require("jsonwebtoken");
const SECERT = "Sourav@123";
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    profileUrl: user.profileUrl,
  };
  return jwt.sign(payload, SECERT);
};

const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, SECERT);
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
