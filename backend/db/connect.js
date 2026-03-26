const { Pool } = require('pg');



const connectionString =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_URL
    : process.env.DB_URL;

const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
console.log('DB CONNECTING TO:', connectionString);
module.exports = db;