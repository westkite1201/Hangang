var express = require('express');
var router = express.Router();
var axios = require('axios');

var wiseSayingData = require('../../public/worddata/wisesaying.json');
var Quotes = require('../../mongo/models/quotes');

const STATUS_CODE = {
  '100': 'success',
  '404': 'data not found',
  '999': 'etc'
};

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
    Quotes.findAllQuotes()
      .then((data) => {
        if (!data.length) {
          return res.json({
            result: '404',
            message: STATUS_CODE['404']
          });
        } else {
          return res.json({
            result: '100',
            message: STATUS_CODE['100'],
            data: data
          });
        }
      });
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'word_data',
      message: error
    });
  }
});

router.post('/insert_quotes', async (req, res) => {
  try {
    const { body } = req;
    Quotes.insertQuotes(body)
      .then((response) => {
        if (response) {
          return res.json({
            result: '100',
            message: STATUS_CODE['100']
          });
        }
      })
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'insert_quotes',
      message: error
    });
  }
});

router.post('/delete_qoutes', async (req, res) => {
  try {
    const { body } = req;
    Quotes.deleteQoutes(body)
      .then((response) => {
        if (response) {
          return res.json({
            result: '100',
            message: STATUS_CODE['100']
          });
        }
      });
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'delete_qoutes',
      message: error
    });
  }
})
module.exports = router;
