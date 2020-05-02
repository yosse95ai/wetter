'use strict';

const info = require('./weatherInfoFunc');

function getDates(time) {
  let dateTime = new Date(time*1000);
  return (dateTime.getMonth()+1)+' 月 '+('0'+dateTime.getDate()).slice(-2)+' 日 '+('0'+dateTime.getHours()).slice(-2)+' 時 '+('0'+dateTime.getMinutes()).slice(-2)+' 分 ';
}
function setTime(step) {
  const now = new Date();
  return (new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0))/1000 + step * 3600;
}
function setDaily(step, hour) {
  const now = new Date();
  return (new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0))/1000 + 24 * step * 3600;
}
//n時間後の天気予報を取得する
function getWeatherForecastInfo(hourly) {
  const ret = {
    '`時刻`': getDates(hourly.dt),
    '`天気`': info.trnsWeatherMain(hourly.weather[0].main),
    '`状態`': hourly.weather[0].description,
    '`気温`': hourly.temp+' [ ℃  ]',
    '`体感`': hourly.feels_like+' [ ℃  ]',
    '`気圧`': hourly.pressure+' [ hPa ]',
    '`湿度`': hourly.humidity+' [ % ]',
    '`風速`': hourly.wind_speed+' [ m/s ]',
    '`風向`': info.windDeg(hourly.wind_deg),
    '`降水量`': forecastRainFall(hourly.rain),
    '`積雪量`': forecastRainFall(hourly.snow),
  };
  return ret;
}
function getWeatherForecastother(daily) {
  const ret = {
    '`最低気温`': daily.temp.min+' [ ℃  ]',
    '`最高気温`': daily.temp.max+' [ ℃  ]',
    '`日の出時刻`': info.getDateTime(daily.sunrise),
    '`日の入時刻`': info.getDateTime(daily.sunset)
  }
  return ret;
}
function forecastRainFall(rain) {
  if (rain === undefined) {
    return undefined;
  } else {
    return rain+' [ mm/h ] ';
  }
}
function getDailyForecastInfo(daily){
  const ret = {
    '`時刻`': getDates(daily.dt),
    '`天気`': info.trnsWeatherMain(daily.weather[0].main),
    '`状態`': daily.weather[0].description,
    '`気圧`': daily.pressure+' [ hPa ]',
    '`湿度`': daily.humidity+' [ % ]',
    '`風速`': daily.wind_speed+' [ m/s ]',
    '`風向`': info.windDeg(daily.wind_deg),
    '`降水量`': forecastRainFall(daily.rain),
    '`積雪量`': forecastRainFall(daily.snow),
    '`UV指数`': daily.uvi,
    '`最低気温`': daily.temp.min+' [ ℃  ]',
    '`最高気温`': daily.temp.max+' [ ℃  ]',
    '`朝気温(体感)`': daily.temp.morn+' ('+ daily.feels_like.morn +') [ ℃  ]',
    '`昼気温(体感)`': daily.temp.day+' ('+ daily.feels_like.day+') [ ℃  ]',
    '`夕気温(体感)`': daily.temp.eve+' ('+ daily.feels_like.eve +') [ ℃  ]',
    '`夜気温(体感)`': daily.temp.night+' ('+ daily.feels_like.night +') [ ℃  ]',
    '`日の出時刻`': info.getDateTime(daily.sunrise),
    '`日の入時刻`': info.getDateTime(daily.sunset)
  };
  return ret;
}


module.exports = {
  getWeatherForecastInfo,
  getWeatherForecastother,
  getDailyForecastInfo,
  getDates,
  setTime,
  setDaily
}