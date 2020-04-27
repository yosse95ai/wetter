'use strict';
const weather = require('../lib/weatherFunc');

module.exports = robot => {
  robot.respond(/天気|weather (.+)/i, msg => {
    const city = msg.match[1];
    Promise.all([
      weather.cityWeather(city)
    ]).then(weather => {
      msg.send(city + 'の天気: '+ weather);
    })
  });
  robot.respond(/ヘルプ|help/i, msg => {
    const commands = {
      'wetter 天気|weather {市町村名}':'市町村周辺の天気を出力',
      'wetter ヘルプ|help':'ヘルプを出力'
    }
    for(let k in commands) {
      msg.send(k+' - '+commands[k]);
    }
  });
}