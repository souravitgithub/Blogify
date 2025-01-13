const { Router } = require("express");
const multer = require("multer");
const Blog = require("../models/blog");
const { addNewBlog, showBlog, postComments } = require("../controllers/blog");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", showBlog);

router.post("/add-new", upload.single("coverImage"), addNewBlog);

router.post("/comments/:id", postComments);

module.exports = router;
