const { check, validationResult } = require("express-validator");
var dbConn = require("../config/dbConfig");

// check name exits or not
function isNameInUse(user_name) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT COUNT(*) AS total FROM users WHERE user_name = ?",
      [user_name],
      function (error, results) {
        if (!error) {
          // console.log("USER NAME COUNT : "+results[0].total);
          return resolve(results[0].total > 0);
        } else {
          return reject(new Error("Database error!!"));
        }
      }
    );
  });
}

// validation rules
exports.userValidator = [
  check("user_name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters long")
    .isLength({ max: 12 })
    .withMessage(" Name must be less than 12 characters long")
    .trim()
    .matches(/^[A-Za-z0-9\_]+$/)
    .withMessage("Name must be alphanumeric only")
    .escape()
    .custom(async (user_name) => {
        const value = await isNameInUse(user_name);
        if (value) {
          throw new Error("Name is already exists!!!");
        }
      }),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Confirm password is empty!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be same!");
      }
      return true;
    }),
];

// validation message
exports.userValidatorMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false,
    code: 400, 
    message: error 
  });
};
