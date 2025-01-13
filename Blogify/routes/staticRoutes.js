const { Router } = require("express");
const Blog = require("../models/blog");

const router = Router();

router.get("/", async (req, res) => {
  //   console.log(req.user);
  const allBlogs = await Blog.find({});
  if (!req.user) {
    return res.render("home", {
      allBlogs,
    });
  }
  return res.render("home", {
    user: req.user,
    allBlogs,
  });
});
router.get("/signup", (req, res) => res.render("signup"));
router.get("/signin", (req, res) => res.render("signin"));
router.get("/add-blog", (req, res) =>
  res.render("addBlog", { user: req.user })
);

module.exports = router;
