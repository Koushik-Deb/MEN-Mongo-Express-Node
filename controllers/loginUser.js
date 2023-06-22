const bcyrpt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      bcyrpt.compare(password, user.password, (error, same) => {
        if (same) {
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    res.redirect("/auth/login");
  }
};
