const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { first_name, last_name, age, email, password } = req.body;
    const message = validationResult(req);

    if (!message.isEmpty()) {
      return res.status(422).json({ errorMessage: message.array()[0].msg });
    }

    const _user = await User.findOne({ email });
    if (_user) {
      return res.status(400).json({ errorMessage: "Email Already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      first_name,
      last_name,
      age,
      email,
      password: hashPassword,
    });
    user.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errorMessage: "Email Not Found" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ errorMessage: "Password Is Wrong" });
    }

    const token = jwt.sign({ id: user._id }, "SECRETTOKEN");

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { login, register };
