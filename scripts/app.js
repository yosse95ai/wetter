'use strict';
const weather = require('../lib/weatherFunc');
const locate = require('../lib/setLocation');

module.exports = robot => {
  //指定地周辺の現在の天気を表示
  robot.respond(/weather c (.+)/i, msg => {
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
  robot.respond(/weather p (.+)/i, msg => {
    const postalCode = msg.match[1].trim();
    Promise.all([
      weather.postalWeather(postalCode, 'jp')
    ]).then(weather => {
      const now = (new Date()).toLocaleString({timeZone:'Asia/Tokyo'});
      msg.send('〒'+postalCode+'の天気('+now+')\n'+weather);
    }).catch(message => {
      msg.send(message);
    })
  });
  robot.respond(/weather o (.+) (.+)/i, msg => {
    const postalCode = msg.match[1].trim();
    const country = msg.match[2].trim();
    Promise.all([
      weather.postalWeather(postalCode, country)
    ]).then(weather => {
      const now = (new Date()).toLocaleString({timeZone:'Asia/Tokyo'});
      msg.send('〒'+postalCode+'の天気('+now+')\n'+weather);
    }).catch(message => {
      msg.send(message);
    })
  });
  //県に存在する市町村を表示
  robot.respond(/list (.+)/i, msg => {
    const prefecture = msg.match[1].trim();
    Promise.all([
      locate.cityList(prefecture)
      ]).then(cities => {
        let t = "";
        let prefectureNum = cities[0].length;
        for(let k = 0; k < prefectureNum; k++){
          t += '`'+cities[0][k].city+'` ';
        }
        msg.send(prefecture+'の市町村リスト('+prefectureNum+')\n'+t);
      }).catch(message => {
        msg.send(message);
      });
  });
  //ヘルプの表示
  robot.respond(/ヘルプ|help/i, msg => {
    const commands = {
      '@wetter weather c {市町村名}':'市町村周辺の現在の天気を表示',
      '@wetter weather o {郵便番号} {該当国ID}':'該当郵便番号の天気を表示',
      '@wetter weather p {日本郵便番号}':'該当郵便番号の天気を表示',
      '@wetter list':'指定県に存在する市町村を表示',
      '@wetter 例|ex':'例文を表示',
      '@wetter ヘルプ|help':'ヘルプを表示'
    }
    msg.send('*ヘルプを表示します*');
    let command = '';
    for(let k in commands) {
      command += '`'+k+'`'+' - '+commands[k]+'\n';
    }
    msg.send(command);
    msg.send('国のIDの詳細は https://openweathermap.org/current');
  });
  robot.respond(/例|ex/i, msg => {
    const ex = ['@wetter weather c 千代田区',
                '@wetter weather o 94040 us',
                '@wetter weather p 100-0001',
                '@wetter list 東京都'
    ];
    for (let i in ex) {
      msg.send(ex[i]);
    }
  });
}