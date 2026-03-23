const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
    rejectUnauthorized: false // Supabase requires SSL
  }
})

module.exports = db