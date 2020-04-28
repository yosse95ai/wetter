'use strict';

const http = require('http');
const MY_WEATHER_APIKEY = '984c99cb9e8846accec0cfd1773b7d35';
const LAT = 33.60639;  //緯度
const LON = 130.41806;  //経度
const OPTION ='&units=metric&lang=ja';
const req = 'http://api.openweathermap.org/data/2.5/onecall?lat='+LAT+'&lon='+LON+'&appid='+ MY_WEATHER_APIKEY+OPTION;
function getDateTime(time) {
  let dateTime = new Date(time*1000);
  return ('0'+dateTime.getHours()).slice(-2)+' 時 '+('0'+dateTime.getMinutes()).slice(-2)+' 分 ';
}
http.get(req, res => {
  var body ='';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    res = JSON.parse(body);
    setTime(res,4);
  });
})
  .on('error', e => {
    console.error(e.message);
});

function setTime(res,step) {
  if ( 0 <= step && step < 48) {
    const now = new Date();
    const setNow = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0))/1000 + step*3600;
    for(let k in res.hourly) {
      if(setNow === res.hourly[k].dt) {
       console.log(getDateTime(res.hourly[k].dt));
      }
    }
  } else {
    console.log("step over or few")
  }
}