const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "huacallani_tec_bd"
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("DataBase is Connected");
    }
});

module.exports = connection;
