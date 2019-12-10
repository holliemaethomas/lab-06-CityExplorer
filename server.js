'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());

app.get('/', (request,response) => {
  response.send('Home Page!');
});

app.get('/location', (request,response) => {
  try {
    const query = request.query.data;
    response.send(searchLatLong(query));
  }
  catch(error) {
    console.error(error);
  }
});

function Location(query, geoData) {
  this.search_query = geoData.results[0].address_components[0].long_name;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function searchLatLong(location) {
  const geoData = require('./data/geo.json');
  const locationData = new (location,geoData);
  console.log('locationData :', locationData);
  return locationData;
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


app.get('/Weather', (request,response) => {
  try {
    const weather = request.query.data;
    response.send(searchLatLong(query));
  }
  catch(error) {
    console.error(error);
  }
});

function Weather(query, weatherForcast) {
  this.search_query = weatherForcast.results[0].address_components[0].long_name;
  this.formatted_query = weatherForcast.results[0].formatted_address;
  this.latitude = weatherForcast.results[0].geometry.location.lat;
  this.longitude = weatherForcast.results[0].geometry.location.lng;
}

function getWeather(location) {
  const weatherForcast = require('./data/darksky.json');
  const weatherData = new Weather(location,weatherForcast);
 
}
