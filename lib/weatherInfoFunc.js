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

function trnsWeatherMain(name) {
  const weatherName = { 'Thunderstorm':'雷雨⛈', 'Drizzle':'霧雨⛆',
                        'Clear':'晴れ☼', 'Rain':'雨🌧', 'Snow':'雪☃',
                        'Mist':'靄⛆', 'Smoke':'煙⛆', 'Haze': '靄⛆',
                        'Dust':'ほこり⛆', 'Fog':'霧⛆', 'Sand':'砂⛆',
                        'Ash':'灰⛆', 'Squall':'スコール🌧', 'Tornado':'竜巻🌪',
                        'Clouds':'くもり🌥' };
  return weatherName[name];
}

function getDateTime(time) {
  let dateTime = new Date(time * 1000);
  return ('0'+dateTime.getHours()).slice(-2)+' 時 '+('0'+dateTime.getMinutes()).slice(-2)+' 分 ';
}

function rainFall(rain) {
  if (rain === undefined) {
    return undefined;
  } else {
    return rain['1h']+' [ mm/h ] ';
  }
}

//天気情報を取得する
function getWeatherInfo(res) {
  const ret = {
    '`天気`': trnsWeatherMain(getWeather(res)[0].main),
    '`状態`': getWeather(res)[0].description,
    '`気温`': getMain(res).temp+' [ ℃  ]',
    '`体感`': getMain(res).feels_like+' [ ℃  ]',
    '`気圧`': getMain(res).pressure+' [ hPa ]',
    '`湿度`': getMain(res).humidity+' [ % ]',
    '`風速`': res.wind.speed+' [ m/s ]',
    '`風向`': windDeg(res.wind.deg),
    '`降水量`':rainFall(res.rain),
    '`積雪量`':rainFall(res.snow),
    '`最低気温`': getMain(res).temp_min+' [ ℃  ]',
    '`最高気温`': getMain(res).temp_max+' [ ℃  ]',
    '`日の出時刻`': getDateTime(res.sys.sunrise),
    '`日の入時刻`': getDateTime(res.sys.sunset)
  };
  return ret;
}

module.exports = {
  getWeatherInfo
}