'use strict';
const weather = require('../lib/weatherFunc');

module.exports = robot => {
  //指定地周辺の現在の天気を表示
  robot.respond(/weather (.+)/i, msg => {
    const city = msg.match[1].trim();
    Promise.all([
      weather.cityWeather(city)
    ]).then(weather => {
      msg.send(city + 'の天気: '+ weather);
    })
  });
  //ヘルプの表示
  robot.respond(/ヘルプ|help/i, msg => {
    const commands = {
      'wetter weather {市町村名}':'市町村周辺の天気を出力',
      'wetter ヘルプ|help':'ヘルプを出力'
    }
    for(let k in commands) {
      msg.send(k+' - '+commands[k]);
    }
  });
}