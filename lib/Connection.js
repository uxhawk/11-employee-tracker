const mysql = require("mysql");
const figlet = require("figlet");
const chalk = require("chalk");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

module.exports = connection;