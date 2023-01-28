const blogModel = require("../Models/blogModel");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllBlogs = async (req, res) => {
  try {
    const resultPerPage = 10;
    const totalBlogsCount = await blogModel.countDocuments();

    const apiFeature = new ApiFeatures(blogModel.find(), req.query).pagination(
      resultPerPage
    );

    let blogs = await apiFeature.query;
    let currPageBlogsCount = blogs.length;

    res.status(200).json({
      success: true,
      totalBlogsCount,
      resultPerPage,
      currPageBlogsCount,
      blogs,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

module.exports.createBlog = async function (req, res) {
  try {
    const blogData = req.body;
    if (!blogData) return res.json({ message: "blog empty" });
    blogData.writerId = req.id;
    const createdBlog = await blogModel.create(blogData);
    res.json({ message: "plan created", plan: createdBlog });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.deleteBlog = async function deleteBlog(req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.json({ message: "trying to delete invalid blog" });
    let deletedBlog = await blogModel.findByIdAndDelete(id);
    res.json({ message: "blog deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.updateBlog = async function updateBlog(req, res) {
  try {
    const id = req.params.id;
    let dataToBeUpdate = req.body;
    let keys = [];
    for (let key in dataToBeUpdate) {
      keys.push(key);
    }
    let blog = await blogModel.findById(id);
    if (!blog) return res.json({ message: "trying to update invalid blog" });
    if (blog.writerId != req.id)
      return res.json({ message: "trying to update un-authorized blog" });
    for (let i = 0; i < keys.length; i++) {
      blog[keys[i]] = dataToBeUpdate[keys[i]];
    }
    await blog.save();
    res.json({ message: "blog updated successfully", updatedPlan: blog });
  } catch (error) {
    res.json({ error: error.message });
  }
};
