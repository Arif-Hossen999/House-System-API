const bcrypt = require("bcrypt");
var dbConn = require("../config/dbConfig");

var User = function (user) {
  this.user_name = user.user_name;
  this.password = user.password;
  this.type = user.type ? user.type : 0;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// create user
User.createUser = (userReqData, result) => {
  const salt = bcrypt.genSaltSync(10);
  userReqData.password = bcrypt.hashSync(userReqData.password, salt);
  // insert data into users table
  dbConn.query("INSERT INTO users SET ?", userReqData, (err, res) => {
    if (err) {
      // console.log("Error while inserting data", err);
      result(null, err);
    } else {
      // console.log("User created successfully");
      result(null, res);
    }
  });
};

// login user
User.loginUser = (user_name, result) => {
  dbConn.query("SELECT * FROM users WHERE user_name = ?", [user_name], (err, res) => {
    if (err) {
      // console.log("Error while search user name", err);
      result(null, err);
    } else {
      result(null, res[0]);
    }
  });
};

module.exports = User;
