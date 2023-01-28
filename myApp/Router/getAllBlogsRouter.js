const express = require("express");
const getAllBlogsRouter = express.Router();
const { getAllBlogs } = require("../Controller/blogController");

getAllBlogsRouter.route("/").get(getAllBlogs);

module.exports = getAllBlogsRouter;
