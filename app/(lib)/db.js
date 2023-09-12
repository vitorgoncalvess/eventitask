import mysql from 'mysql2';

const aws = {
  host: '52.45.208.66',
  port: '3306',
  database: 'eventitask',
  user: 'root',
  password: '1991',
};

const local = {
  host: 'localhost',
  port: '3306',
  database: 'eventitask',
  user: 'root',
  password: '1991',
};

const db = mysql.createPool(local);

export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};
