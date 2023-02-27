const express = require("express");
const router = express();
const userControllers = require("../controllers/user");
const { body } = require("express-validator");
const User = require("../models/user");
const isAuth = require("../middleware/is-auth");

router.post(
  "/register",
  [
    body("first_name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("firstName Is a Required Field"),
    body("last_name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("lastName Is a Required Field"),
    body("age").trim().not().isEmpty().withMessage("Age Is a Required Field"),
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("email Is a Required Field")
      .isEmail()
      .withMessage("email not valid"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password Is a Required Field")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password Must Be At Least 6 Character to 12 Character "),
  ],

  userControllers.register
);

router.post(
  "/login",
  [
    body("password")
      .notEmpty()
      .withMessage("Password Is a Required Field")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password Must Be At Least 6 Character to 12 Character "),
  ],
  userControllers.login
);

router.get("/verify", isAuth, (req, res) => {
  try {
    return res.status(200).json({ message: "Valid Token" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
