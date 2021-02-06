const pgp = require('pg-promise')();

const PG_HOST = process.env.PG_HOST || 'localhost';
const PG_PORT = process.env.PG_PORT || 5432;
const PG_DB = process.env.PG_DB || 'sdc';

const connectionString = `postgres://${PG_HOST}:${PG_PORT}/${PG_DB}`;
const db = pgp(connectionString);

const retrieveOneProperty = (id, cb) => {
  const queryString = `SELECT pr.id, name, city, region, country, ph.url, ph.caption, SUM(r.stars) AS stars, COUNT(r.stars) AS reviews FROM properties pr LEFT JOIN photos ph ON ph.propertyId = pr.id LEFT JOIN reviews r ON r.propertyId = pr.id WHERE pr.id = ${id} GROUP BY pr.id, ph.id`;
  db.query(queryString)
    .then(data => {
      var {id, name, city, region, country, stars, reviews} = data[0];
      var property = {id, name, city, region, country, stars, reviews};
      property.photos = data.map(photo => {
        return {
          url: photo.url,
          caption: photo.caption
        };
      });
      cb(null, property);
    })
    .catch(err => cb(err));
};

const retrievePropertySplit = (id, cb) => {
  const prop = `SELECT p.id, name, city, region, country, SUM(r.stars) AS stars, COUNT(r.stars) AS reviews FROM properties p LEFT JOIN reviews r ON r.propertyId = p.id WHERE p.id = ${id} GROUP BY p.id`;
  const photos = `SELECT url, caption FROM photos WHERE propertyId = ${id}`;
  Promise.all([db.one(prop), db.query(photos)])
    .then(data => {
      var property = data[0];
      property.photos = data[1];
      cb(null, property);
    })
    .catch(err => cb(err));
};

module.exports = {
  db,
  retrieveOneProperty,
  retrievePropertySplit
};