var dbConn = require("../config/dbConfig");

var Category = function (category) {
  this.category_name = category.category_name;
  this.status = category.status ? category.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};
// get category
Category.getCategory = (result) => {
  dbConn.query("SELECT categories.id as categoryId, categories.category_name, categories.status as categoryStatus, categories.created_at as categoryCreatedAt,categories.updated_at as categoryUpdatedAt, products.id as productId, products.product_name, products.status as productStaus,products.created_at as productCreatedAt,products.updated_at as productUpdatedAt FROM categories INNER JOIN products ON categories.id = products.category_id  WHERE categories.status = 1 AND products.status = 1", (err, res) => {
    if (err) {
      // console.log("Error while fetching category", err);
      result(null, err);
    } else {
      // console.log("Category fetched successfully");
      result(null, res);
    }
  });
};
// get category by Id
Category.getCategoryById = (id, result) => {
  dbConn.query("SELECT categories.id as categoryId, categories.category_name, categories.status as categoryStatus, categories.created_at as categoryCreatedAt,categories.updated_at as categoryUpdatedAt, products.id as productId, products.product_name, products.status as productStaus,products.created_at as productCreatedAt,products.updated_at as productUpdatedAt FROM categories INNER JOIN products ON categories.id = products.category_id  WHERE categories.status = 1 AND products.status = 1 AND categories.id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching category by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
// create category
Category.createCategory = (categoryReqData, result) => {
  dbConn.query("INSERT INTO categories SET ?", categoryReqData, (err, res) => {
    if (err) {
      // console.log("Error while inserting data", err);
      result(null, err);
    } else {
      // console.log("Category created successfully");
      result(null, res);
    }
  });
};
// update category
Category.categoryUpdate = (id, categoryReqData, result) => {
  dbConn.query(
    "UPDATE categories SET category_name=?, status=? WHERE id=?",
    [
      categoryReqData.category_name,
      categoryReqData.status,
      id,
    ],
    (err, res) => {
      if (err) {
        // console.log("Error while updating data", err);
        result(null, err);
      } else {
        // update products status
        if(categoryReqData.status == 0){
          dbConn.query(
            "UPDATE products SET status=? WHERE category_id=?",
          [
            categoryReqData.status,
            id,
          ]
          )
        }
        // console.log("Category update successfully",);
        result(null, res);
      }
    }
  );
};
// delete category
Category.deleteCategory = (id, result) => {
  dbConn.query("DELETE FROM categories WHERE id=?",id, (err, res)=>{
    if(err){
      // console.log("Error while deleting data", err);
      result(null, err);
    }
    else{
      // delete products
      dbConn.query("DELETE FROM products WHERE category_id=?",id)
      // console.log("Category delete successfully",id);
      result(null, res)
    }
  })
};

module.exports = Category;
