const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// import routes
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");

// create route
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

// define root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});
// handling route error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not Found",
  });
});
// handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something Went Wrong",
  });
});
module.exports = app;
