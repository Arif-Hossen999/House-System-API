const { check, validationResult } = require("express-validator");
var dbConn = require("../config/dbConfig");

// validation rules
exports.loginValidator = [
  check("user_name")
    .notEmpty()
    .withMessage("Name is required!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
  
];

// validation message
exports.loginValidatorMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false,
    code: 400, 
    message: error });
};
