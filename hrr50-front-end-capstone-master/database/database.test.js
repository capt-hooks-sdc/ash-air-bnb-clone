const {retrieveOneProperty} = require('./index.js');

console.time('A');
retrieveOneProperty(9000000, (err, results) => {
  console.timeEnd('A');
  if (err) {
    console.log('ENDED WITH ERROR: ', err);
  }
});