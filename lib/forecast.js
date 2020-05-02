'use strict';
const location = require('./setLocation');
const fore = require('./forecastInfo');
const MY_WEATHER_APIKEY = '984c99cb9e8846accec0cfd1773b7d35';
const TEMPLATE_O = 'http://api.openweathermap.org/data/2.5/onecall?'
const OPTION ='&units=metric&lang=ja';

function cityWeatherForecast(city, step) {
  return new Promise((resolve, reject) => {
    if (step <= 0 || 47 < step) {
      reject('Error:\n0から47時間後までしか検索できません');
    } else {
      Promise.all([
        location.setLotLat(city)
      ])
      .then(locTmp => {
        const loc = locTmp[0];
        const req = TEMPLATE_O+'lat='+loc.lat+'&lon='+loc.lon+'&appid='+ MY_WEATHER_APIKEY+OPTION;
        Promise.all([
          location.moduleTmp(req)
        ])
        .then(resTmp => {
          const res = resTmp[0];
          let forward = '';
          let lost = '';
          for(let k in res.hourly) {
            if(fore.setTime(step) === res.hourly[k].dt) {
              forward = fore.getWeatherForecastInfo(res.hourly[k]);
            }
          }
          for (let k in res.daily) {
            if ((new Date(fore.setTime(step)*1000)).getDate() === (new Date(res.daily[k].dt*1000)).getDate()){
              lost =  fore.getWeatherForecastother(res.daily[k]);
            }
          }
          for (let k in lost) { forward[k] = lost[k]; }
          let weather = '';
          for (let k in forward) {
            if (forward[k] !== undefined) {
              weather += k + ' : ' + forward[k] + '\n';
            }
          }
          resolve(weather);
        })
        .catch(message => {
          reject(message);
        });
      })
      .catch(message => {
        reject(message);
      });
    }
  });
}

function cityDayWeather(city, dayStep){
  return new Promise((resolve, reject) => {
    Promise.all([
      location.setLotLat(city)
    ])
    .then(locTmp => {
      const loc = locTmp[0];
      const req = TEMPLATE_O+'lat='+loc.lat+'&lon='+loc.lon+'&appid='+ MY_WEATHER_APIKEY+OPTION;
      Promise.all([
        location.moduleTmp(req)
      ])
      .then(resTmp => {
        const dailyInfo = resTmp[0].daily;
        let information = '';
        let weather = '';
        for(let k in dailyInfo) {
          if (dailyInfo[k].dt === fore.setDaily(dayStep,(new Date(dailyInfo[k].dt*1000).getHours()))) {
            information = fore.getDailyForecastInfo(dailyInfo[k]);
          }
        }
        for(let i in information) {
          if (information[i] !== undefined){
            weather += i + ' : '+information[i]+'\n';
          }
        }
        resolve(weather);
      })
      .catch(error => {
        reject(error);
      });
    })
    .catch(error => {
      reject(error);
    });
  });
}

// Promise.all([
//   cityDayWeather('福岡市', 7)
// ])
// .then(resTmp => {
//   const res = resTmp[0];
//   console.log(res);
// })
// .catch(message => {
//   console.log(message);
// });

module.exports = {
  cityWeatherForecast,
  cityDayWeather
}