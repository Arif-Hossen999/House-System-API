const { check, validationResult } = require("express-validator");
var dbConn = require("../config/dbConfig");

// check name exits or not
function isCategoryNameInUse(category_name) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT COUNT(*) AS total FROM categories WHERE category_name = ?",
      [category_name],
      function (error, results) {
        if (!error) {
          // console.log("CATEGORY NAME COUNT : "+results[0].total);
          return resolve(results[0].total > 0);
        } else {
          return reject(new Error("Database error!!"));
        }
      }
    );
  });
}

// validation rules
exports.categoryValidator = [
  check("category_name")
    .notEmpty()
    .withMessage("Category name is required!")
    .trim()
    .escape()
    .custom(async (category_name) => {
      const value = await isCategoryNameInUse(category_name);
      if (value) {
        throw new Error("Category name is already exists!!!");
      }
    }),
  
];

// validation message
exports.categoryValidatorMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false, 
    code: 400,
    message: error 
  });
};
