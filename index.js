require("dotenv").config();
const app = require("./app");

// setup port
const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
