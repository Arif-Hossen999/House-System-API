var dbConn = require("../config/dbConfig");
const ProductModel = require("../models/productModel");

// get product list
exports.getProduct = (req, res) => {
  ProductModel.getProduct((err, product) => {
    if (err) {
      res.send(err);
      res.json({
        status: false,
        code: 400,
        message: "Something Went Wrong",
      });
    } else {
      res.status(200).send(product);
    }
  });
};
// get product by ID
exports.getProductById = (req, res) => {
  ProductModel.getProductById(req.params.id, (err, product) => {
    // check error
    if (err) {
      res.send(err);
      res.json({
        status: false,
        code: 400,
        message: "Something Went Wrong",
      });
    }
    // check id exists or not
    if (product == "") {
      res.json({
        status: false,
        code: 400,
        message: "Product not Found!!",
      });
    }
    // return response
    else {
      res.status(200).send(product);
    }
  });
};
// create new product
exports.createProduct = (req, res) => {
  const productReqData = new ProductModel(req.body);
  ProductModel.createProduct(productReqData, (err, product) => {
    if (err) {
      res.send(err);
      res.json({
        status: false,
        code: 400,
        message: "Something Went Wrong",
      });
    } else {
      res.json({
        status: true,
        code: 201,
        message: "Product created successfully",
        insertId: product.insertId,
      });
    }
  });
};
// product update
exports.productUpdate = (req, res) => {
  const productReqData = new ProductModel(req.body);

  ProductModel.productUpdate(req.params.id, productReqData, (err, product) => {
      // check error
      if(err){
          res.send(err);
          res.json({
            status: false, 
            code: 400,
            message: "Something Went Wrong"
          })
      }
      // check id exists or not
      if(product.message[15] == 0){
          res.json({
            status: false, 
            code: 400,
            message: "Product not Found!!"
          });
      }
      // return response
      else{
          res.json({
            status: true, 
            code: 200,
            message: "Product updated successfully"
          });
      }
  })

}
// delete product
exports.deleteProduct = (req, res) => {
  ProductModel.deleteProduct(req.params.id, (err, product) => {
    // check error
    if (err) {
      res.send(err);
      res.json({ 
        status: false,
        code: 400, 
        message: "Something Went Wrong" 
      });
    }
    // check id exists or not
    if (product.affectedRows == 0) {
      res.json({ 
        status: false,
        code: 400, 
        message: "Product not Found!!" 
      });
    }
    // return response
    else {
      res.json({ 
        status: true,
        code: 200, 
        message: "Product deleted successfully" 
      });
    }
  });
};
