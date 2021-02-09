const {retrievePropertySplit} = require('../index.js');

console.time('split query');
retrievePropertySplit(9999999, (err, results) => {
  console.timeEnd('split query');
  if (err) {
    console.log('ENDED WITH ERROR: ', err);
  }
});