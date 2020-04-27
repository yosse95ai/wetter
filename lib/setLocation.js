'use strict';
const http = require('http');

//市町村名に応じた緯度経度の平均値を取得
function getLotLat(city){
  return new Promise((resolve, reject) => {
    const reqTmp = 'http://geoapi.heartrails.com/api/json?method=getTowns&city='+city;
    const req = encodeURI(reqTmp);
    http.get(req, res => {
      let body ='';
      res.on('data', (chunk) => {
        body = body.concat(chunk);
      });
      res.on('end', () => {
        res = JSON.parse(body);
        if (!res.response.error) {
          const cityNum = res.response.location.length;
          let loc = {lon: 0, lat: 0};
            for(let k in res.response.location){
              loc.lon += parseFloat(res.response.location[k].x);
              loc.lat += parseFloat(res.response.location[k].y);
            }
          loc.lon /= cityNum;
          loc.lat /= cityNum;
          resolve(loc);
        } else {
          reject('Error: 指定された市町村が見当たりませんでした。');
        }
      });
    })
      .on('error', e => {
        reject(e.message);
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

module.exports = {
  setLotLat
}