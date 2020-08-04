var express = require('express');
var router = express.Router();

/* use modules */
var axios = require('axios');
var axiosExtension = require('axios-extensions');

/* Create Cache instance with axios extension */
var instance = axios.create({
  baseURL: '/',
  Accept: 'application/json',
  headers: { 'Cache-Control': 'no-cache' }, //커스텅 캐싱을 원할 경우 no-cache
  adapter: axiosExtension.cacheAdapterEnhancer(
    axios.defaults.adapter,
    { enabledByDefault: false }
    //enabledByDefault false <=  모든 네트워크 요청에 캐싱된 데이터 사용 x
  )
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Five Hangang data */
router.get('/api/getHangangTemp', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/WPOSInformationTime/1/5/`
    );
    res.send(data.WPOSInformationTime.row);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
