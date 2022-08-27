const { check, validationResult } = require("express-validator");
var dbConn = require("../config/dbConfig");

// check name exits or not
function isProductNameInUse(product_name) {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT COUNT(*) AS total FROM products WHERE product_name = ?",
      [product_name],
      function (error, results) {
        if (!error) {
          // console.log("PRODUCT NAME COUNT : "+results[0].total);
          return resolve(results[0].total > 0);
        } else {
          return reject(new Error("Database error!!"));
        }
      }
    );
  });
}

// validation rules
exports.productValidator = [
  check("product_name")
    .notEmpty()
    .withMessage("Product name is required!")
    .trim()
    .escape()
    .custom(async (product_name) => {
      const value = await isProductNameInUse(product_name);
      if (value) {
        throw new Error("Product name is already exists!!!");
      }
    }),
    check("category_id")
    .notEmpty()
    .withMessage("Category id is required"),
  
];

// validation message
exports.productValidatorMsg = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ 
    success: false,
    code: 400, 
    message: error 
  });
};
