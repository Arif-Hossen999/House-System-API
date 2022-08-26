const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const UserModel = require("../models/userModel");

// create user
exports.createUser = (req, res) => {
  const userData = {
    user_name: req.body.user_name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    type: req.body.type,
  };
  const userReqData = new UserModel(userData);
  UserModel.createUser(userReqData, (err, user) => {
    if (err) {
      res.send(err);
      res.json({ 
        status: false, 
        code: 400, 
        message: "Something Went Wrong" 
    });
    } else {
      res.json({
        status: true,
        code: 201,
        message: "User created successfully",
        insertId: user.insertId,
      });
    }
  });
};
// login user
exports.login = (req, res) => {
  const body = req.body;
  UserModel.loginUser(body.user_name, (err, results) => {
    if (err) {
      res.send(err);
      res.json({ 
        status: false, 
        code: 400, 
        message: "Something Went Wrong" 
    });
    }
    // check email exists or not
    if (!results) {
      res.json({
        status: false,
        code: 400,
        message: "Invalid name or password",
      });
    } else {
      // check req password and db password
      const result = bcrypt.compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "5h",
        });
        return res.json({
          success: true,
          code: 200,
          message: "login successfully",
          loginUserId: results.id,
          token: jsontoken,
        });
      } else {
        return res.json({
          success: false,
          code: 400,
          message: "Invalid name or password",
        });
      }
    }
  });
};
