const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

const homeController = require("./controllers/home");
const newPostController = require("./controllers/newPost");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const validateMiddleWare = require("./middleware/validationMiddleware");
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

app.use("/posts/store", validateMiddleWare);
app.get("/", homeController);
app.get("/post/:id", getPostController);
app.get("/posts/new", newPostController);
app.post("/posts/store", storePostController);
