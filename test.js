const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://127.0.0.1/blog_db", { useNewUrlParser: true });

async function createPost() {
  try {
    const newBlog = await new BlogPost({
      title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
      body: `If you have been here a long time, you might remember when I went on ITV Tonight to
            dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money
            topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery
            opens up. You know those bullet-point lists. You start spotting them everything at this time of year.
            They go like this:`,
    });

    const blog = await newBlog.save();
    console.log(blog);
  } catch (err) {
    console.log("Error in createPost ", err);
  }
}

async function findPost() {
  try {
    const blog = await BlogPost.find({
      title: /Updated/,
    });
    console.log("blog ", blog);
  } catch (err) {
    console.log("Error in find post ", err);
  }
}
// var id = "647ecc1ff3d5a9d0cfe107b7";
// BlogPost.findByIdAndUpdate(id, {
//   title: "Updated Title",
// })
//   .then((response) => {
//     console.log("response ", response);
//   })
//   .catch((err) => {
//     console.log("Error ", err);
//   });

// createPost();
// findPost();
