const pgp = require('pg-promise')();

const PG_HOST = process.env.PG_HOST || 'localhost';
const PG_PORT = process.env.PG_PORT || 5432;
const PG_DB = process.env.PG_DB || 'sdc';

const connectionString = `postgres://${PG_HOST}:${PG_PORT}/${PG_DB}`;
const db = pgp(connectionString);

const retrieveOneProperty = (id, cb) => {
  const queryString = `SELECT name, city, region, country, ph.url, ph.caption, r.stars FROM properties pr INNER JOIN photos ph ON ph.propertyId = pr.id INNER JOIN reviews r ON r.propertyId = pr.id WHERE pr.id = ${id}`;
  db.query(queryString)
    .then(data => cb(null, data))
    .catch(err => cb(err));
};

module.exports = {
  db: db,
  retrieveOneProperty: retrieveOneProperty
};