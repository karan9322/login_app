const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const User = await userModel.findOne({ email });
    if (User) {
      return res.status(401).json({
        message: "user already exist",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = new userModel({
      name,
      password,
      email,
    });
    user.password = hashPassword;
    await user.save();
    res.status(500).json({
      success: true,
      message: "Registration successful!!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await userModel.findOne({ email });
    if (!User) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign(
      { email: User.email, userId: User._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Token created successfully",
      success: true,
      token: token,
      name: User.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const product = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);

    res.status(200).json({
      message: [
        { name: "mobile", price: "15,000$" },
        { name: "laptop", price: "45,000$" },
      ],
      user: req.user,
    });
  } catch (error) {
    console.error("Product Retrieval Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  signupUser,
  product,
};
