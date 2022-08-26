var dbConn = require("../config/dbConfig");
const CategoryModel = require("../models/categoryModel");

// get category list
exports.getCategory = (req, res) => {
  CategoryModel.getCategory((err, category) => {
    if (err) {
      res.send(err);
      res.json({
        status: false,
        code: 400,
        message: "Something Went Wrong",
      });
    } else {
      res.status(200).send(category);
    }
  });
};
// get employee by ID
exports.getCategoryById = (req, res) => {
  // console.log("get employee by id");
  CategoryModel.getCategoryById(req.params.id, (err, category) => {
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
    if (category == "") {
      res.json({
        status: false,
        code: 400,
        message: "Category not Found!!",
      });
    }
    // return response
    else {
      res.status(200).send(category);
    }
  });
};
// create new category
exports.createCategory = (req, res) => {
  const categoryReqData = new CategoryModel(req.body);
  CategoryModel.createCategory(categoryReqData, (err, category) => {
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
        message: "Category created successfully",
        insertId: category.insertId,
      });
    }
  });
};
// category update
exports.categoryUpdate = (req, res) => {
  const categoryReqData = new CategoryModel(req.body);

  CategoryModel.categoryUpdate(req.params.id, categoryReqData, (err, category) => {
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
      if(category.message[15] == 0){
          res.json({
            status: false, 
            code: 400,
            message: "Category not Found!!"
          });
      }
      // return response
      else{
        // console.log("category update", category);
          res.json({
            status: true, 
            code: 200,
            message: "Category updated successfully"
          });
      }
  })

}
// delete category
exports.deleteCategory = (req, res) => {
  CategoryModel.deleteCategory(req.params.id, (err, category) => {
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
    if (category.affectedRows == 0) {
      res.json({ 
        status: false,
        code: 400, 
        message: "Category not Found!!" 
      });
    }
    // return response
    else {
      res.json({ 
        status: true,
        code: 200, 
        message: "Category deleted successfully" 
      });
    }
  });
};
