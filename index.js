const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const BlogPost = require("./models/BlogPost");
const app = express();

mongoose.connect("mongodb://127.0.0.1/blog_db", { useNewUrlParser: true });

const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/index.html"));
  const blogposts = await BlogPost.find({});
  res.render("index", {
    blogposts,
  });
});
app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
});
app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  // res.sendFile(path.resolve(__dirname, "pages/post.html"));
  res.render("post", {
    blogpost,
  });
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.post("/posts/store", async (req, res) => {
  // console.log(req.body);
  try {
    let image = req.files.image;
    let folder = path.resolve(__dirname, "public/img", image.name);
    console.log("image ", folder);
    image.mv(folder, async (error) => {
      const newBlog = await new BlogPost({
        ...req.body,
        image: "/img/" + image.name,
      });
      await newBlog.save();
      res.redirect("/");
    });
  } catch (err) {
    console.log("Error in createPost ", err);
  }
});
