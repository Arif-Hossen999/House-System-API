var dbConn = require("../config/dbConfig");

var Product = function (product) {
  this.product_name = product.product_name;
  this.status = product.status ? product.status : 1;
  this.category_id = product.category_id;
  this.created_at = new Date();
  this.updated_at = new Date();
};
// get products
Product.getProduct = (result) => {
  dbConn.query("SELECT * FROM products WHERE status = 1", (err, res) => {
    if (err) {
      // console.log("Error while fetching category", err);
      result(null, err);
    } else {
      // console.log("Product fetched successfully");
      result(null, res);
    }
  });
};
// get product by Id
Product.getProductById = (id, result) => {
  dbConn.query("SELECT * FROM products WHERE status = 1 AND id=?", id, (err, res) => {
    if (err) {
      // console.log("Error while fetching category by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
// create product
Product.createProduct = (productReqData, result) => {
  dbConn.query("INSERT INTO products SET ?", productReqData, (err, res) => {
    if (err) {
      // console.log("Error while inserting data", err);
      result(null, err);
    } else {
      // console.log("Product created successfully");
      result(null, res);
    }
  });
};
// update product
Product.productUpdate = (id, productReqData, result) => {
  dbConn.query(
    "UPDATE products SET product_name=?, status=?, category_id=? WHERE id=?",
    [
      productReqData.product_name,
      productReqData.status,
      productReqData.category_id,
      id,
    ],
    (err, res) => {
      if (err) {
        // console.log("Error while updating data", err);
        result(null, err);
      } else {
        // console.log("Product update successfully");
        result(null, res);
      }
    }
  );
};
// delete product
Product.deleteProduct = (id, result) => {
  dbConn.query("DELETE FROM products WHERE id=?",id, (err, res)=>{
    if(err){
      // console.log("Error while deleting data", err);
      result(null, err);
    }
    else{
      // console.log("Product delete successfully");
      result(null, res)
    }
  })
};

module.exports = Product;
