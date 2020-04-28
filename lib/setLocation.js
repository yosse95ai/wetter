'use strict';
const http = require('http');

//httpリクエストのテンプレート
function moduleTmp(reqTmp) {
  return new Promise((resolve, reject) => {
    const req = encodeURI(reqTmp);
    http.get(req, res => {
      let body ='';
      res.on('data', (chunk) => {
        body = body.concat(chunk);
      });
      res.on('end', () => {
        resolve(JSON.parse(body));
      });
    })
    .on('error', e => {
        reject(e.message);
    });
  });
}

//市町村名に応じた緯度経度の平均値を取得
function getLotLat(city){
  return new Promise((resolve, reject) => {
    const req = 'http://geoapi.heartrails.com/api/json?method=getTowns&city='+city;
    Promise.all([
      moduleTmp(req)
    ]).then(resTmp => {
      let res = resTmp[0];
      if (!res.response.error) {
        let cityNum = res.response.location.length;
        if (cityNum >= 50) { cityNum = 50; }
        let loc = {lon: 0, lat: 0};
          for(let k = 0; k < cityNum; k++){
            loc.lon += parseFloat(res.response.location[k].x);
            loc.lat += parseFloat(res.response.location[k].y);
          }
        loc.lon /= cityNum;
        loc.lat /= cityNum;
        resolve(loc);
      } else {
        reject('Error:\n指定された市町村が見当たりませんでした。\nこのコードは日本にしか対応していません');
      }
    })
    .catch(message => {
      reject(message);
    });
  });
}

//緯度経度を割り当てる
function setLotLat(city) {
  return new Promise((resolve, reject) => {
    Promise.all([
      getLotLat(city)
    ])
    .then(data => {
      let loc = {lon: data[0].lon, lat: data[0].lat};
      resolve(loc);
    })
    .catch(message => {
      reject(message);
    });
  });
}

function cityList(prefecture) {
  return new Promise((resolve, reject) => {
    const req = 'http://geoapi.heartrails.com/api/json?method=getCities&prefecture='+prefecture;
    Promise.all([
      moduleTmp(req)
    ])
    .then(res => {
      if (!res[0].response.error) {
        resolve(res[0].response.location);
      } else {
        reject('Error:\n県名を正しく入力してください。');
      }
    });
  });
}

module.exports = {
  setLotLat,
  cityList,
  moduleTmp
}