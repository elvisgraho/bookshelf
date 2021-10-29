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

// book
app.get('/book/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const getQuery = `select * from bookshelf WHERE id = ${bookId}`;
  const { rows } = await pool.query(getQuery);
  res.send(rows);
});

app.post('/book', async (req, res) => {
  // `isbn` varchar(30) NOT NULL,
  // `name` varchar(50) NOT NULL,
  // `authors` varchar(50) NOT NULL,
  // `annotation` varchar(100) NOT NULL,
  const isbn = req.body.isbn ? req.body.isbn : '';
  const name = req.body.name ? req.body.name : '';
  const authors = req.body.authors ? req.body.authors : '';
  const annotation = req.body.annotation ? req.body.annotation : '';

  const insertQuery = `insert into bookshelf (isbn, name, authors, annotation) values ('${isbn}', '${name}','${authors}','${annotation}');`;

  console.log(req.body, insertQuery);

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
