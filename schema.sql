DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc;

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  region VARCHAR NOT NULL,
  country VARCHAR NOT NULL
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  propertyId INT REFERENCES properties (id),
  url VARCHAR NOT NULL,
  caption VARCHAR
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  propertyId INT REFERENCES properties (id),
  stars INT NOT NULL
);

CREATE INDEX ON photos (propertyId);
CREATE INDEX ON reviews (propertyId);