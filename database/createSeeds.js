const fs = require('fs');
const faker = require('faker');

const writeProperties = fs.createWriteStream(`${__dirname}/seeds/properties.csv`);
writeProperties.write('name,city,region,country\n', 'utf8');

const writeManyProperties = (writer, encoding, callback = () => writeProperties.end()) => {
  let i = 10000000;
  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      i -= 1;
      const name = faker.address.county() + ' ' + faker.address.streetSuffix();
      const city = faker.address.city();
      const region = faker.address.state();
      const country = faker.address.country().replace(/,/g, '');
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

const writePhotos = fs.createWriteStream(`${__dirname}/seeds/photos.csv`);
writePhotos.write('propertyId,url,caption\n');

const writeManyPhotos = (writer, encoding, callback = () => writeProperties.end()) => {
  let i = 10000000;
  let perProp = faker.random.number({min: 6, max: 10});
  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      perProp -= 1;
      const propertyId = i;
      if (perProp === 0) {
        i -= 1;
        perProp = faker.random.number({min: 6, max: 10});
      }
      const url = `https://loremflickr.com/911/605?lock=${faker.random.number({min: 1, max: 1000})}`;
      const caption = faker.random.number(100) > 50 ? faker.lorem.sentence() : '';
      const data = `${propertyId},${url},${caption}\n`;
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

const writeReviews = fs.createWriteStream(`${__dirname}/seeds/reviews.csv`);
writeReviews.write('propertyId,stars\n');

const writeManyReviews = (writer, encoding, callback = () => writeProperties.end()) => {
  let i = 10000000;
  let perProp = faker.random.number({min: 5, max: 15});
  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      perProp -= 1;
      const propertyId = i;
      if (perProp === 0) {
        i -= 1;
        perProp = faker.random.number({min: 5, max: 15});
      }
      const stars = faker.random.number({min: 1, max: 5});
      const data = `${propertyId},${stars}\n`;
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
  console.log('properties done!');
});

writeManyPhotos(writePhotos, 'utf8', () => {
  writePhotos.end();
  console.log('photos done!');
});

writeManyReviews(writeReviews, 'utf8', () => {
  writeReviews.end();
  console.log('reviews done!');
});
