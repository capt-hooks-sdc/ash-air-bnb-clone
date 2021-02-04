const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'PhotoGallery',
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to the database');
  }
});

const addProperties = (name, location, favorites, callback) => {
  con.query(
    'INSERT INTO Property (name, location, favorites) VALUES (?, ?, ?)', [name, location, favorites], callback
  );
};

const addPhotos = (photoURL, id, callback) => {
  con.query(
    'INSERT INTO Photos (photoUrl, propertyID) VALUES (?, ?)', [photoURL, id], callback
  );
};

const retrieveOneProperty = (index, callback) => {
  con.query(
    `select Property.name, Property.location, Property.favorites, photoURL from Property join Photos on Property.id = Photos.propertyID where Property.id = ${index}`, callback
  );
};

module.exports = {
  addPhotos,
  addProperties,
  retrieveOneProperty,
};
