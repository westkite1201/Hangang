let express = require('express');
let router = express.Router();
let axios = require('axios');

let Quotes = require('../../mongo/models/quotes');
let HangangTemp = require('../../mongo/models/hangangTemp');
const moment = require('moment');
const { json } = require('express');
require('moment-timezone');

const helpers = require('../../common/helpers');

const STATUS_CODE = {
  '200': 'success',
  '404': 'data not found',
  '999': 'etc'
};

/* 한강 물 데이터 저장 */
router.get('/insert_hangang_data', async function (req, res, next) {
  try {
    const { data } = await axios.get(
      `${process.env.SEOUL_OPENAPI_URL}` +
        `/${process.env.API_KEY}` +
        '/json/WPOSInformationTime/1/5/'
    );
    let hangangTempData = data.WPOSInformationTime.row;

    const hangangTemp = new HangangTemp();

    hangangTemp.collection.createIndex(
      { MSR_DATE: 1, MSR_TIME: 1, SITE_ID: 1 },
      { unique: true }
    );

    // const result = await hangangTemp.save();
    //const result = await hangangTemp.collection.insertMany(hangangTempData);
    hangangTempData.forEach((value, index) => {
      hangangTemp.collection.updateMany(
        {
          MSR_DATE: value.MSR_DATE,
          MSR_TIME: value.MSR_TIME,
          SITE_ID: value.SITE_ID
        },
        {
          $set: {
            MSR_DATE: value.MSR_DATE,
            W_TEMP: value.W_TEMP,
            W_PH: value.W_PH,
            W_DO: value.W_DO,
            W_TP: value.W_TP,
            W_TOC: value.W_TOC,
            W_PHEN: value.W_PHEN,
            W_CN: value.W_CN,
            UPDATE_TIME: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
          }
        },
        { upsert: true }
      );
    });
    return res.json({
      result: '0000',
      data: hangangTempData
    });
  } catch (error) {
    console.error(error);
    return res.json('error');
  }
});

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

/**
 * 명언 조회(소재상태 구분에 따른 조회)
 */
router.post('/word_data', async (req, res) => {
  try {
    const { accepted } = req.body;
    const filter = {
      ACCEPTED: accepted,
      STATUS: '0'
    };
    Quotes.find(filter, (error, quotes) => {
      if (error) {
        return res.json(makeReturnData('999', error));
      } else {
        if (quotes.length === 0) {
          return res.json(makeReturnData('404'));
        } else {
          const jsonObj = helpers.makeJsonKeyLower(quotes);
          return res.json(makeReturnData('100', jsonObj));
        }
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

/**
 * 명언 조회(admin계정, return data로는 wait상태의 명언과 accepted 상태의 명언이 array로 같이 들어옴)
 */
router.post('/word_data_admin', async (req, res) => {
  try {
    const returnArray = {};
    let filter = {
      ACCEPTED: '1',
      STATUS: '0'
    };
    Quotes.find(filter, (error, submit_quotes) => {
      if (error) {
        return res.json(makeReturnData('999', error));
      } else {
        returnArray.submit_quotes = helpers.makeJsonKeyLower(submit_quotes);
        filter = {
          ACCEPTED: '0',
          STATUS: '0'
        };
        Quotes.find(filter, (error, accepted_quotes) => {
          if (error) {
            return res.json(makeReturnData('999', error));
          } else {
            returnArray.accepted_quotes = helpers.makeJsonKeyLower(
              accepted_quotes
            );
            return res.json(makeReturnData('100', returnArray));
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'word_data_admin',
      message: error
    });
  }
});
/**
 * 명언 추가(소재상태는 기본적으로 대기)
 */
router.post('/insert_quotes', async (req, res) => {
  try {
    const {
      name,
      word,
      thumbnail_user_image,
      thumbnail_background_image,
      accepted
    } = req.body;
    const data = helpers.makeJsonKeyUpper({
      name,
      word,
      thumbnail_user_image,
      thumbnail_background_image,
      accepted
    });
    const quotes = new Quotes(data);
    quotes.save((error) => {
      if (error) {
        return res.json(makeReturnData('999', error));
      } else {
        return res.json(makeReturnData('100'));
      }
    });
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'insert_quotes',
      message: error
    });
  }
});

/**
 * 명언 삭제(소재 상태 변경으로 처리해서, 기존 데이터 확인가능하도록)
 * 소재상태: '0'(사용중), '1'(삭제)
 */
router.post('/delete_quotes', async (req, res) => {
  try {
    const { id } = req.body;
    const set = {
      STATUS: '1',
      UPDATE_TIME: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
    };
    Quotes.update({ _id: id }, { $set: set }, (error, output) => {
      if (error) {
        return res.json(makeReturnData('999', error));
      } else {
        return res.json(makeReturnData('100'));
      }
    });
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'delete_qoutes',
      message: error
    });
  }
});

/**
 * 승인상태 변경
 * accepted: '0'(승인), '1'(대기), '2'(거절)
 */

router.post('/update_quotes_accepted', async (req, res) => {
  try {
    const { ids, accepted } = req.body;
    const returnArray = {};
    const set = {
      ACCEPTED: accepted
    };
    Quotes.update(
      { _id: ids },
      { $set: set },
      { multi: true },
      (error, output) => {
        if (error) {
          return res.json(makeReturnData('999', error));
        } else {
          let filter = {
            ACCEPTED: '1',
            STATUS: '0'
          };
          Quotes.find(filter, (error, submit_quotes) => {
            if (error) {
              return res.json(makeReturnData('999', error));
            } else {
              returnArray.submit_quotes = helpers.makeJsonKeyLower(
                submit_quotes
              );
              filter = {
                ACCEPTED: '0',
                STATUS: '0'
              };
              Quotes.find(filter, (error, accepted_quotes) => {
                if (error) {
                  return res.json(makeReturnData('999', error));
                } else {
                  returnArray.accepted_quotes = helpers.makeJsonKeyLower(
                    accepted_quotes
                  );
                  return res.json(makeReturnData('100', returnArray));
                }
              });
            }
          });
          // return res.json(makeReturnData("100", output));
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.json({
      api: 'update_qoutes_accepted',
      message: error
    });
  }
});

function makeReturnData(code, data) {
  return {
    result: code,
    message: STATUS_CODE[code],
    data: data
  };
}

module.exports = router;
