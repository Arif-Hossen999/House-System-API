const mysql = require("mysql");

// create db connection
const dbConn = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

dbConn.connect(function (error) {
    if(error) throw error;
    console.log("Database connect successfully");
});

module.exports = dbConn;
