const fs = require('fs');
const faker = require('faker');

const writeProperties = fs.createWriteStream(`${__dirname}/seeds/properties.csv`);
writeProperties.write('name,city,region,country\n', 'utf8');

const writeManyProperties = (writer, encoding, callback = () => writeProperties.end()) => {
  let i = 10000;
  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      i -= 1;
      const name = faker.company.companyName();
      const city = faker.address.city();
      const region = faker.address.state();
      const country = faker.address.country();
      const data = `${name},${city},${region},${country}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

writeManyProperties(writeProperties, 'utf8', () => {
  writeProperties.end();
  console.log('all done!');
});
