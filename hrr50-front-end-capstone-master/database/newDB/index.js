const pgp = require('pg-promise')();

const PG_HOST = process.env.PG_HOST || 'localhost';
const PG_PORT = process.env.PG_PORT || 5432;
const PG_DB = process.env.PG_DB || 'sdc';

const connectionString = `postgres://${PG_HOST}:${PG_PORT}/${PG_DB}`;
const db = pgp(connectionString);

module.exports = {
  db: db,
  // Queries go here
};