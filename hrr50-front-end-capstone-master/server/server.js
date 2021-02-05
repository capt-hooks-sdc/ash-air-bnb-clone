const express = require('express');
const path = require('path');
const compression = require('compression');
const { retrieveOneProperty } = require('../database/index.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/bundle', express.static(path.join(__dirname, '..', 'public/app.js')));

app.get('/photos', (req, res) => {
  var property = req.query.property || 1;
  retrieveOneProperty(property, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at localhost:${3000}!`);
});

module.exports = app;
