const Blog = require("../models/blog");
const Comments = require("../models/comment");

const addNewBlog = async (req, res) => {
  const reqBody = req.body;
  const blog = await Blog.create({
    title: reqBody.title,
    body: reqBody.body,
    coverImage: `/uploads/${req.file.filename}`,
    createdBy: req.user.id,
  });
  return res.redirect(`/blogs/${blog._id}`);
};

const showBlog = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id }).populate("createdBy");
  const comments = await Comments.find({ blogId: req.params.id }).populate(
    "userId"
  );
  // console.log(comment);
  return res.render("viewBlog", {
    blog,
    user: req.user,
    comments,
  });
};
const postComments = async (req, res) => {
  // return res.send("Comment Posted");
  const { content } = req.body;
  await Comments.create({
    content: content,
    blogId: req.params.id,
    userId: req.user.id,
  });
  return res.send(content);
};

module.exports = {
  addNewBlog,
  showBlog,
  postComments,
};
