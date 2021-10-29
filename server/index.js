const express = require('express');
const bodyParser = require('body-parser');

// Set our postgres environement
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'postgresqls',
  database: 'bookshelf',
  password: 'password',
  port: 5432,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Index Route
app.get('/', async (req, res) => {
  try {
    const getQuery = `select * from bookshelf`;
    const { rows } = await pool.query(getQuery);
    res.send(rows);
  } catch (err) {
    res.send(err);
  }
});

// get
app.get('/get', async (req, res) => {
  const getQuery = `select * from bookshelf`;
  const { rows } = await pool.query(getQuery);
  res.send(rows);
});

app.post('/book', async (req, res) => {
  // ISBN
  // Name
  // Authors
  // Short Annotation
  const bookISBN = req.body.ISBN;
  const bookName = req.body.name;
  const insertQuery = `insert into bookshelf (ISBN, name) values (${bookISBN}, ${bookName});`;
  const qRes = await pool.query(insertQuery);

  res.send(req.body);
});

app.delete('/delete/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const deleteQuery = `DELETE FROM bookshelf WHERE id = ${bookId}`;
  const qRes = await pool.query(deleteQuery);

  res.send(bookId);
});

const port = process.env.PORT || 3150;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
