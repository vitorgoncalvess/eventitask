import mysql from "mysql2";
const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  database: "eventitask",
  user: "aluno",
  password: "sptech",
});

export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};
