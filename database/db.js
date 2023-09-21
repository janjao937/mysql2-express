const mysql2= require("mysql2/promise");
const db = mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"mysql_todo_list",
    connectionLimit:11
});

module.exports = db;