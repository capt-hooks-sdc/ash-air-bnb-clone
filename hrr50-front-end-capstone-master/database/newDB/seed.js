const {db} = require('./index.js');
const seedProperties = `COPY properties(name, city, region, country) FROM '${__dirname}/seeds/properties.csv' DELIMITER ',' CSV HEADER`;
db.query(seedProperties)
  .then(data => console.log(data))
  .catch(err => console.error('\n\nERROR:\n\n', err));
