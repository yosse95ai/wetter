'use strict';

function getAll(res) {
  return res;
}

function getWeather(res) {
  return res.weather;
}

function getWeatherMain(res) {
  return getWeather(res)[0].main;
  
}

module.exports = {
  getAll,
  getWeather,
  getWeatherMain
}