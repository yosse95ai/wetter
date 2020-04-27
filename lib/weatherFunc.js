'use strict';
const http = require('http');
const info = require('./weatherInfoFunc');
const location = require('./setLocation');
const MY_WEATHER_APIKEY = '984c99cb9e8846accec0cfd1773b7d35';

//指定市町村の現在の天気
function cityWeather(city){
  return new Promise((resolve, reject) => {
    Promise.all([
      location.setLotLat(city)
    ])
    .then(loc => {
      loc = loc[0];
      const LON = loc.lon;  //経度
      const LAT = loc.lat;  //緯度
      const OPTION ='&units=metric&lang=ja';
      const req = 'http://api.openweathermap.org/data/2.5/weather?lat='+LAT+'&lon='+LON+'&appid='+MY_WEATHER_APIKEY+OPTION;
    
      http.get(req, res => {
        let body ='';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body = body.concat(chunk);
        });
        res.on('end', () => {
          res = JSON.parse(body);
          let infom ='';
          for(let i in info.getWeatherInfo(res)){
            infom += i+' : '+info.getWeatherInfo(res)[i]+'\n';
          }
          resolve(infom);
        });
      })
        .on('error', e => {
          reject(e.message);
      });
    });
  });
}
// cityWeather('岡垣');
module.exports = {
  cityWeather
};