import mysql from "mysql2";

const aws = {
  host: "10.0.0.24",
  port: "3306",
  database: "eventitask",
  user: "root",
  password: "1991",
};

const local = {
  host: "localhost",
  port: "3306",
  database: "eventitask",
  user: "root",
  password: "1991",
};

const db = mysql.createPool(aws);

export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};
