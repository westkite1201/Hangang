var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/hangang_data', async function (req, res, next) {
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
