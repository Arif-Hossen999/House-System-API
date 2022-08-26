const jwt = require("jsonwebtoken");
module.exports = {
  // check token
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            code: 400,
            message: "Invalid Token! Please login",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        code: 401,
        message: "Access Denied! Please login.",
      });
    }
  },
  // check loggin user type
  checkLoginUserType: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            code: 400,
            message: "Invalid Token...",
          });
        } else {
          req.decoded = decoded;
          const userType = decoded.result.type;
          if(userType == 1){
            next();
          }
          else{
            return res.json({
              success: false,
              code: 401,
              message: "Access Denied! You are not admin.",
            });
          }
        }
      });
    } else {
      return res.json({
        success: false,
        message: "Access Denied! Unauthorized User",
      });
    }
  },
};
