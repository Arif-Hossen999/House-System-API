const express = require('express');
const router = express.Router();

// import controller
const productController = require('../controllers/productController');
// import validator
const {productValidator, productValidatorMsg} = require('../validation/productValidation');
// import middleware
const { checkToken, checkLoginUserType } = require("../middleware/auth");

// get all product 
router.get('/', productController.getProduct);
// get product by id
router.get('/:id', productController.getProductById);
// create product
router.post('/create/',productValidator, productValidatorMsg, checkToken, checkLoginUserType, productController.createProduct);
// update / enable / disable product
router.put('/update/:id', checkToken, checkLoginUserType, productController.productUpdate);
// delete product
router.delete('/delete/:id', checkToken, checkLoginUserType, productController.deleteProduct);

module.exports = router;