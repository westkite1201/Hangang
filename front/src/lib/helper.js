import { stationLocationArray } from './CommonData';

/* 좌표 거리 계산 */
export function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  // var lat1 = array[0].getLat();
  // var lng1 = array[0].getLng();
  // var lat2 = array[1].getLat();
  // var lng2 = array[1].getLng();
  console.log(lat1, lng1, lat2, lng2);
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var r = 6371; //지구의 반지름(km)
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = r * c; // Distance in km
  return Math.round(d * 1000);
}

export function getNearbyStaion(nowLat, nowLng) {
  let minDistance = 99999999;
  let stationNum = 0;
  let distance;
  for (let i = 0; i < stationLocationArray.length; i++) {
    const { index, lat, lng } = stationLocationArray[i];
    distance = getDistanceFromLatLonInKm(nowLat, nowLng, lat, lng);
    console.log('distance', distance);
    if (minDistance > distance) {
      stationNum = index;
      minDistance = distance;
    }
  }
  stationLocationArray[stationNum].distance = distance;
  return stationLocationArray[stationNum];
}
