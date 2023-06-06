const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1/blog_db", { useNewUrlParser: true });

const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/index.html"));
  res.render("index");
});
app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
});
app.get("/post", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/post.html"));
  res.render("post");
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.post("/post/store", (req, res) => {
  console.log(req.)
})
