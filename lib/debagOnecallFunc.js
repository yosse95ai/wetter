'use strict';

const http = require('http');
const a = require('./forecastInfo')
const MY_WEATHER_APIKEY = '984c99cb9e8846accec0cfd1773b7d35';
const LAT = 33.60639;  //緯度
const LON = 130.41806;  //経度
const OPTION ='&units=metric&lang=ja';
const req = 'http://api.openweathermap.org/data/2.5/onecall?lat='+LAT+'&lon='+LON+'&appid='+ MY_WEATHER_APIKEY+OPTION;
function getDate(time) {
  let dateTime = new Date(time*1000);
  return (dateTime.getMonth()+1)+' 月 '+('0'+dateTime.getDate()).slice(-2)+' 日 '+('0'+dateTime.getHours()).slice(-2)+' 時 '+('0'+dateTime.getMinutes()).slice(-2)+' 分 ';
}
http.get(req, res => {
  var body ='';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    res = JSON.parse(body);
    const step = 3;
    
  console.log(a.setDaily(step));
    for(let k in res.daily) {
      console.log(getDate(res.daily[k].dt)+' : '+res.daily[k].dt)
    //console.log(res.daily[k].weather[0]);
  }
    for(let k in res.daily) {
      if(a.setDaily(step) === res.daily[k].dt) {
      console.log('いまから '+step+'d後の天気')
      console.log(getDate(res.daily[k].dt));
      console.log(res.daily[k].weather);
      }
    }
    // for (let k in res.daily) {
    //   if ((new Date(setTime(step)*1000)).getDate() === (new Date(res.daily[k].dt*1000)).getDate()){
    //     console.log((new Date(setTime(step)*1000)).getDate());
    //     console.log(res.daily[k].temp.min);
    //   }
    // }
  });
})
  .on('error', e => {
    console.error(e.message);
});

function setTime(step) {
  if ( 0 <= step && step < 48) {
    const now = new Date();
    return (new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0))/1000 + step*3600;
  } else {
    return "step over or few";
  }
}