var express = require('express');
var router = express.Router();
var axios = require('axios');

var wiseSayingData = require('../../public/worddata/wisesaying.json');

router.get('/hangang_data', async function (req, res, next) {
  try {
    const { data } = await axios.get(
      `${process.env.SEOUL_OPENAPI_URL}` +
      `/${process.env.API_KEY}` +
      '/json/WPOSInformationTime/1/5/'
    );
    return res.json({
      result: '0000',
      data: data.WPOSInformationTime.row
    });
  } catch (error) {
    console.error(error);
    return res.json('error');
  }
});

router.get('/word_data', async (req, res) => {
  try {
    return res.json({
      result: '0000',
      data: wiseSayingData.data
    });

  } catch (error) {
    console.error(error);
    return res.json('error');
  }
})
module.exports = router;
