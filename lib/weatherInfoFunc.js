'use strict';

function getWeather(res) {
  return res.weather;
}

function getMain(res) {
  return res.main;
}

//風向の確定
function windDeg(deg) {
  const degName = ["北","北北東","北東", "東北東", 
                   "東", "東南東", "南東", "南南東",
                   "南", "南南西", "南西", "西南西", 
                   "西", "西北西", "北西", "北北西", "北"];
  return degName[Math.round(deg/22.5)];
}

//天気情報を取得する
function getWeatherInfo(res) {
  const ret = {
    '`天気`': getWeather(res)[0].main,
    '`状態`': getWeather(res)[0].description,
    '`気温`': getMain(res).temp+' [ ℃  ]',
    '`気圧`': getMain(res).pressure+' [ hPa ]',
    '`湿度`': getMain(res).humidity+' [ % ]',
    '`風速`': res.wind.speed+' [ m/s ]',
    '`風向`': windDeg(res.wind.deg),
    '`最低気温`': getMain(res).temp_min+' [ ℃  ]',
    '`最高気温`': getMain(res).temp_max+' [ ℃  ]',
    '`体感気温`': getMain(res).feels_like+' [ ℃  ]'
  };
  return ret;
}

module.exports = {
  getWeatherInfo
}