const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/userController');
// import validator
const {userValidator, userValidatorMsg} = require('../validation/userValidation');
const {loginValidator,loginValidatorMsg} = require("../validation/loginValidation");

// create user
router.post('/create/',userValidator, userValidatorMsg, userController.createUser);

// login user 
router.post('/login/',loginValidator,loginValidatorMsg, userController.login);


module.exports = router;