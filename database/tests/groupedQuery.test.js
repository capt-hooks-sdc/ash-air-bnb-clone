const {retrieveOneProperty} = require('../index.js');

console.time('all together');
retrieveOneProperty(9999999, (err, results) => {
  console.timeEnd('all together');
  if (err) {
    console.log('ENDED WITH ERROR: ', err);
  }
});