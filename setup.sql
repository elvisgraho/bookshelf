
-- create table
CREATE TABLE IF NOT EXISTS "bookshelf" (
  "id" SERIAL,
  "isbn" varchar(30) NOT NULL,
  "name" varchar(50) NOT NULL,
  "authors" varchar(50) NOT NULL,
  "annotation" varchar(100) NOT NULL,
  PRIMARY KEY ("id")
);


-- ALTER TABLE bookshelf ADD COLUMN IF NOT EXISTS isbn VARCHAR(30);
-- ALTER TABLE bookshelf ADD COLUMN IF NOT EXISTS name VARCHAR(50);
-- ALTER TABLE bookshelf ADD COLUMN IF NOT EXISTS authors VARCHAR(50);
-- ALTER TABLE bookshelf ADD COLUMN IF NOT EXISTS annotation VARCHAR(100);


-- INSERT INTO bookshelf (name) values ('uptest');