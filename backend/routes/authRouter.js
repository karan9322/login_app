const express = require("express");
const { registerUser, signupUser, product } = require("../controllers/auth");
const {
  registerValidate,
  signupValidate,
  productValidation,
} = require("../middlewears/validation");
const router = express.Router();

router.post("/register", registerValidate, registerUser);
router.post("/signup", signupValidate, signupUser);
router.get("/product", productValidation, product);

module.exports = router;
