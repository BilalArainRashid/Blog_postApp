import mysql from "mysql";

/// Create database connection

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogpost"
});
