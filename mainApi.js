const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set our postgres environement
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'postgresqls',
  database: 'bookshelf',
  password: 'password',
  port: 5432,
});

//Index Route
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('select * from bookshelf');
    res.send(rows);
  } catch (err) {
    res.send(err);
  }
});

const port = process.env.PORT || 3150;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
