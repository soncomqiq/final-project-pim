const mysql = require("mysql2")
const {DB_PORT, DB_DATABASE, DB_PASSWORD, DB_USER, DB_HOST} = require("../configs/constants");

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
}

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err)
    console.log("Cannot connect database")
  } else {
    console.log("Database is connected")
  }
})

pool.on('error', (err) => {
  console.log(err)
})

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  pool,
  query
};