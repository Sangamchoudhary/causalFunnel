const mongoose = require("mongoose");
const express = require("express");
const db_link =
  "mongodb+srv://admin:sangam9069@cluster0.vc3oatt.mongodb.net/?retryWrites=true";
const cookieParser = require("cookie-parser");
const app = express();

mongoose.set("strictQuery", true);

app.use(express.json()); // middle  ware
app.listen(3000);
app.use(cookieParser());

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

const userRouter = require("./Router/userRouter");
app.use("/api/user", userRouter); // base url, router-to-use

const blogRouter = require("./Router/blogRouter");
app.use("/api/blog", blogRouter); // base url, router-to-use
