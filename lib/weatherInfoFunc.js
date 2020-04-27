'use strict';

function getWeather(res) {
  return res.weather;
}

function getMain(res) {
  return res.main;
}

function getWeatherInfo(res) {
  const ret = {
    '天気': getWeather(res)[0].main,
    '状態': getWeather(res)[0].description,
    '気温': getMain(res).temp+' ℃ ',
    '体感気温': getMain(res).feels_like+' ℃ ',
    '気圧': getMain(res).pressure+' hPa',
    '湿度': getMain(res).humidity+' %',
    '最低気温': getMain(res).temp_min+' ℃ ',
    '最高気温': getMain(res).temp_max+' ℃ '
  };
  return ret;
}

module.exports = {
  getWeatherInfo
}