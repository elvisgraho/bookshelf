# bookshelf

Db+BackendAPI+Frontent application for managing and storing Book-Relevant Information

Dev Commands

```

docker-compose build --no-cache
docker-compose up -d

docker ps

--- test ---
docker exec -it postgresqlpostgis bash
psql -U postgres

\c bookshelf

create table bookshelf (id serial primary key, name varchar(64));
insert into bookshelf (name) values ('test1');
insert into bookshelf (name) values ('test2');

```
