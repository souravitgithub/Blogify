const { Router } = require("express");
const User = require("../models/user");
const {
  handleSignUp,
  handleSignIn,
  handleSignOut,
} = require("../controllers/user");

const router = Router();

router.post("/signup", handleSignUp);

router.post("/signin", handleSignIn);

router.get("/signout", handleSignOut);
module.exports = router;
