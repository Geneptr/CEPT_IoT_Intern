const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '172.27.128.1',
  database: 'postgres',
  password: 'password',
  port: 30000,
});

module.exports = pool;