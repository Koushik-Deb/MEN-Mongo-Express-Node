const User = require("../models/User");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    return res.redirect("/auth/register");
  }
};
