var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/hangang_data', async function (req, res, next) {
  try {
    const { data } = await axios.get(
      `${process.env.SEOUL_OPENAPI_URL}` +
      `/${process.env.API_KEY}` +
      '/json/WPOSInformationTime/1/5/'
    );
    return res.send(data.WPOSInformationTime.row);
  } catch (error) {
    console.error(error);
    return res.json('error');
  }
});

module.exports = router;
