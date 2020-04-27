'use strict';
const weather = require('../lib/weatherFunc');

module.exports = robot => {
  //指定地周辺の現在の天気を表示
  robot.respond(/weather (.+)/i, msg => {
    const city = msg.match[1].trim();
    Promise.all([
      weather.cityWeather(city)
    ]).then(weather => {
      const now = (new Date()).toLocaleString({timeZone:'Asia/Tokyo'});
      msg.send(city+'周辺の天気('+now+')\n'+weather);
    }).catch(message => {
      msg.send(message);
    });
  });
  //ヘルプの表示
  robot.respond(/ヘルプ|help/i, msg => {
    const commands = {
      'wetter weather {市町村名}':'市町村周辺の現在の天気を出力',
      'wetter ヘルプ|help':'ヘルプを出力'
    }
    msg.send('*ヘルプを表示します*');
    for(let k in commands) {
      msg.send('`'+k+'`'+' - '+commands[k]);
    }
  });
}