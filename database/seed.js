const {db} = require('./index.js');
const seedProperties = `COPY properties(name, city, region, country) FROM '${__dirname}/seeds/properties.csv' DELIMITER ',' CSV HEADER`;
const seedPhotos = `COPY photos(propertyId, url, caption) FROM '${__dirname}/seeds/photos.csv' DELIMITER ',' CSV HEADER`;
const seedReviews = `COPY reviews(propertyId, stars) FROM '${__dirname}/seeds/reviews.csv' DELIMITER ',' CSV HEADER`;
db.query(seedProperties)
  .then(() => {
    console.log('properties all seeded!');
    db.query(seedPhotos)
      .then(() => console.log('photos all seeded!'));
    db.query(seedReviews)
      .then(() => console.log('reviews all seeded!'));
  })
  .catch(err => console.error('\n\nERROR:\n\n', err));
