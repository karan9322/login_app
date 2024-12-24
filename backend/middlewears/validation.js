const joi = require("joi");
const jwt = require("jsonwebtoken");
function registerValidate(req, res, next) {
  const Schema = joi.object({
    name: joi.string().min(3).required().max(20),
    email: joi.string().email().required().max(50),
    password: joi.string().min(4).max(20).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
  next();
}

function signupValidate(req, res, next) {
  const Schema = joi.object({
    email: joi.string().email().required().max(50),
    password: joi.string().min(4).max(20).required(),
  });
  const { error } = Schema.validate(req.body);
  console.log("body", req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
  next();
}

function productValidation(req, res, next) {
  const auth = req.headers["authorization"];
  console.log("req", req.headers);
  console.log("auth : ", auth);
  if (!auth) {
    return res.status(401).json({
      message: "Authorization token is missing",
    });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = decoded;

    if (decoded) {
      next();
    } else {
      res.status(400).json({
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
}

module.exports = {
  registerValidate,
  signupValidate,
  productValidation,
};
