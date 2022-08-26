const express = require('express');
const router = express.Router();

// import controller
const categoryController = require('../controllers/categoryController');
// import validator
const {categoryValidator, categoryValidatorMsg} = require('../validation/categoryValidation');
// import middleware
const { checkToken, checkLoginUserType } = require("../middleware/auth");

// get all category 
router.get('/', categoryController.getCategory);
// get category by id
router.get('/:id', categoryController.getCategoryById);
// create category
router.post('/create/',categoryValidator, categoryValidatorMsg, checkToken, checkLoginUserType, categoryController.createCategory);
// update / enable / disable category
router.put('/update/:id', checkToken, checkLoginUserType, categoryController.categoryUpdate);
// delete category
router.delete('/delete/:id', checkToken, checkLoginUserType, categoryController.deleteCategory);

module.exports = router;