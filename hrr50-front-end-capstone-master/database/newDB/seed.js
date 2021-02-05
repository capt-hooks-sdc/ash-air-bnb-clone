const {db} = require('./index.js');
console.log(db);
db.query('SELECT * FROM properties')
  .then(data => console.log(data))
  .catch(err => console.error('\n\nERROR:\n\n', err));
