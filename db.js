const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.TODO_DB_USER,
  password: process.env.TODO_DB_PASS,
  port: process.env.TODO_DB_PORT,
  database: process.env.TODO_DB_NAME,
});

module.exports = pool;