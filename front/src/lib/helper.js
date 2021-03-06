import moment from 'moment';
import { stationLocationArray } from './CommonData';
import clientConfig from '../configuration/clientConfig';

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
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = r * c; // Distance in km
  return Math.round(d * 1000);
}

export function getNearbyStaionArray(nowLat, nowLng) {
  // sort
  for (let i = 0; i < stationLocationArray.length; i++) {
    const { lat, lng } = stationLocationArray[i];
    let distance = getDistanceFromLatLonInKm(nowLat, nowLng, lat, lng);
    stationLocationArray[i].distance = distance;
    //console.log('distance', distance);
  }
  //console.log('stationLocationArray', stationLocationArray);
  let byDistance = stationLocationArray.slice(0);
  byDistance.sort(function (a, b) {
    return a.distance - b.distance;
  });
  //console.log('byDistance ', byDistance);
  // stationLocationArray[stationNum].distance = distance;
  return byDistance;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
//일출05:44일몰19:30
//아침, 저녁 , 밤 ,새벽,
export function getBackgroundImage() {
  let time = moment().format('HHmm');
  console.log('time', time);
  if (600 < time && time <= 1730) {
    console.log('아침');
    return `/images/hangang/morning_${getRandomInt(0, 2)}.jpg`;
  } else if (1730 < time && time <= 2000) {
    console.log('저녁', getRandomInt(0, 0));
    //일단 새벽이미지 사용
    return `/images/hangang/dawn_${getRandomInt(0, 0)}.jpg`;
  } else if ((2000 < time && time <= 2400) || time <= 600) {
    console.log('밤');
    return `/images/hangang/night_${getRandomInt(0, 2)}.jpg`;
  }
}

//수온 별로  온도 분기
export function getWaterTempertureColor() {}

export function getContentCardType(pst_exps_typ_cd) {
  switch (pst_exps_typ_cd) {
    case '10':
      return 'poster';
    case '20':
      return 'banner';
    case '30':
      return 'thumb';

    default:
      return 'default';
  }
}

export const getContrastYIQ = (color) => {
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 220 ? '#000000' : '#ffffff';
};

// eslint-disable-next-line
export const getRandomHexColor = () =>
  `#${`0${(~~(Math.random() * 16777215)).toString(16)}`.slice(-6)}`;

//quotes에 보여울 filename 조립
export const getImageFileFullPath = (quotes) => {
  const {
    usePreview,
    backgroundImagePath,
    thumbnail_background_image,
    isUnsplash
  } = quotes;
  if (usePreview) {
    if (backgroundImagePath) {
      if (isUnsplash) {
        return backgroundImagePath;
      }
      return clientConfig.endpoint.api + '/file/image/' + backgroundImagePath;
    }
    return '/images/temp.jpeg';
  } else {
    if (thumbnail_background_image) {
      return (
        clientConfig.endpoint.api + '/file/image/' + thumbnail_background_image
      );
    }
    return '/images/temp.jpeg';
  }
};
//insert_quotes 하기전 이미지 이름 추출
export const extractImageFileName = (quotes) => {
  const { backgroundImagePath, isUnsplash, id } = quotes;
  //qutoes id
  if (isUnsplash) {
    return id + '.jpg';
  } else {
    return backgroundImagePath;
  }
};
