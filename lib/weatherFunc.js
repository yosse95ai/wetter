'use strict';
const http = require('http');
const info = require('./weatherInfoFunc');
const location = require('./setLocation');
const MY_WEATHER_APIKEY = '984c99cb9e8846accec0cfd1773b7d35';
const TMPLATE = 'http://api.openweathermap.org/data/2.5/weather?';

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
      const req = TMPLATE+'lat='+LAT+'&lon='+LON+'&appid='+MY_WEATHER_APIKEY+OPTION;
      http.get(req, res => {
        let body ='';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body = body.concat(chunk);
        });
        res.on('end', () => {
          res = JSON.parse(body);
          let infomation ='';
          for(let i in info.getWeatherInfo(res)){
            infomation += i+' : '+info.getWeatherInfo(res)[i]+'\n';
          }
          resolve(infomation);
        });
      })
        .on('error', e => {
          reject(e.message);
      });
    })
    .catch(message => {
      reject(message);
    });
  });
}

//日本の郵便番号で検索
function postalWeatherJp(postalCode) {
  const zip = postalCode;
  const req = TMPLATE+'zip='+zip+',jp&appid='+MY_WEATHER_APIKEY;

}


module.exports = {
  cityWeather,
  postalWeatherJp
};