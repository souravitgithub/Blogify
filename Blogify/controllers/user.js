const User = require("../models/user");
const handleSignUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({ fullName, email, password });
  return res.redirect("/");
};

const handleSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.checkPasswordAndGenerateToken(email, password);

    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.render("signin", {
      error: error.message,
    });
  }
};

const handleSignOut = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/signin");
};

module.exports = {
  handleSignUp,
  handleSignIn,
  handleSignOut,
};
