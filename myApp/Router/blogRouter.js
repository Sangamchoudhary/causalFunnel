const express = require("express");
const { protectRoute } = require("../Controller/authController");
const blogRouter = express.Router();
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../Controller/blogController");

blogRouter.use(protectRoute);

blogRouter.route("/").get(getAllBlogs);
blogRouter.route("/").post(createBlog);
blogRouter.route("/:id").patch(updateBlog);
blogRouter.route("/:id").delete(deleteBlog);

module.exports = blogRouter;
