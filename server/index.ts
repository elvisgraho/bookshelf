import { updateDataToString } from './utils';
import express from 'express';
import { Request, Response } from 'express';

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
app.get('/', async (req, res, next) => {
  try {
    const getQuery = `select * from bookshelf`;
    const { rows } = await pool.query(getQuery);
    res.send(rows);
  } catch (err) {
    return next(err);
  }
});

// book
app.get('/book/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const getQuery = `select * from bookshelf WHERE id = ${bookId}`;
    const { rows } = await pool.query(getQuery);
    res.send(rows);
  } catch (err) {
    return next(err);
  }
});

app.post('/book', async (req, res, next) => {
  // `isbn` varchar(30) NOT NULL,
  // `name` varchar(50) NOT NULL,
  // `authors` varchar(50) NOT NULL,
  // `annotation` varchar(100) NOT NULL,
  try {
    if (
      typeof req.body.isbn != 'string' ||
      typeof req.body.name != 'string' ||
      typeof req.body.authors != 'string' ||
      typeof req.body.annotation != 'string'
    ) {
      throw `Bad data! ${JSON.stringify(req.body)}`;
    }
    const insertQuery = `insert into bookshelf (isbn, name, authors, annotation) values ('${req.body.isbn}', '${req.body.name}', '${req.body.authors}', '${req.body.annotation}');`;
    const qRes = await pool.query(insertQuery);
    res.send(req.body);
  } catch (err) {
    return next(err);
  }
});

app.delete('/delete/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const deleteQuery = `DELETE FROM bookshelf WHERE id = ${bookId}`;
    const qRes = await pool.query(deleteQuery);

    res.send(bookId);
  } catch (err) {
    return next(err);
  }
});

app.put('/update/:bookId', async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const updateString = updateDataToString(req.body);
    const updateQuery = `UPDATE bookshelf SET ${updateString} WHERE id = ${bookId}`;
    const qRes = await pool.query(updateQuery);
    res.send(req.body);
  } catch (err) {
    return next(err);
  }
});

app.get('/initData', async (req, res, next) => {
  // init random books
  // `isbn` varchar(30) NOT NULL,
  // `name` varchar(50) NOT NULL,
  // `authors` varchar(50) NOT NULL,
  // `annotation` varchar(100) NOT NULL,
  try {
    const insertQuery1 = `insert into bookshelf (isbn, name, authors, annotation) values ('${
      0 - 5510 - 7005 - 1
    }', 'Test Book 1', 'Peter Meter', 'Annotation test 1');`;
    await pool.query(insertQuery1);
    const insertQuery2 = `insert into bookshelf (isbn, name, authors, annotation) values ('${
      0 - 5510 - 7005 - 2
    }', 'Test Book 2', 'Bob Peter', 'Annotation test 2');`;
    await pool.query(insertQuery2);
    const insertQuery3 = `insert into bookshelf (isbn, name, authors, annotation) values ('${
      0 - 5510 - 7005 - 3
    }', 'Test Book 3', 'Day Morgan', 'Annotation test 3');`;
    await pool.query(insertQuery3);
    const insertQuery4 = `insert into bookshelf (isbn, name, authors, annotation) values ('${
      0 - 5510 - 7005 - 4
    }', 'Test Book 4', 'Neg Meg', 'Annotation test 4');`;
    await pool.query(insertQuery4);

    res.send(req.body);
  } catch (err) {
    return next(err);
  }
});

app.use((error: Error, req: any, res: any, next: any) => {
  console.log('Error Middleware.');
  console.log('Path: ', req.path);
  console.error('Error: ', error);

  res.status(400).send(error);
});

const port = process.env.PORT || 3150;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
