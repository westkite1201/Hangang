let express = require('express');
let router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const he = require('he');
const parser = require('fast-xml-parser');
//parser option
let options = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ['parse-me-as-string'],
};

let OPTIONS = {
  url: null,
  qs: null,
  method: 'GET',
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10,
};

const HOST = 'http://openapi.data.go.kr';
const BASE_PATH_CORONA =
  '/openapi/service/rest/Covid19/getCovid19InfStateJson?';

router.post('/get-corona', async (req, res) => {
  try {
    const request = require('request');
    const querystring = require('querystring');
    OPTIONS.url = HOST + BASE_PATH_CORONA;
    let serviceKey = process.env.DATA_GO_API_KEY;

    //1주일치
    const defaultParams = {
      pageNo: 1,
      numOfRows: 15,
      startCreateDt: moment().subtract(15, 'day').format('YYYYMMDD'),
      endCreateDt: moment().format('YYYYMMDD'),
    };
    const { pageNo, numOfRows, startCreateDt, endCreateDt } = defaultParams;

    let propertiesObject = querystring.stringify({
      pageNo: pageNo,
      numOfRows: numOfRows,
      startCreateDt: startCreateDt,
      endCreateDt: endCreateDt,
    });
    propertiesObject = querystring.unescape(propertiesObject);

    OPTIONS.url += encodeURIComponent('ServiceKey') + '=' + serviceKey + '&';
    OPTIONS.url += propertiesObject;
    OPTIONS.url = OPTIONS.url;
    //async를 위해 request 함수 선언
    function doRequest() {
      return new Promise(function (resolve, reject) {
        request(OPTIONS, (err, res, result) => {
          try {
            console.log(err, result);
            response = statusCodeErrorHandlerAsync(
              res.statusCode,
              result,
              false,
            );
            if (response.message !== 'error') {
              resolve(response);
            } else {
              reject(err);
            }
          } catch (e) {
            reject(err);
          }
        });
      });
    }
    const resXml = await doRequest();
    if (resXml.status === 200 && resXml.message === 'success') {
      var jsonObj = parser.parse(resXml.data, options);
      resXml.data = jsonObj;
      return res.json(resXml);
    }
  } catch (e) {
    console.log('error', e);
    const res = statusCodeErrorHandlerAsync(400, e);
    return res;
  }
});

const statusCodeErrorHandlerAsync = (statusCode, data, isJson = true) => {
  try {
    switch (statusCode) {
      case 200:
        console.log('data ', data);
        return {
          message: 'success',
          status: 200,
          data: isJson ? JSON.parse(data) : data,
        };
      default:
        return {
          message: 'error',
          status: 400,
          data: isJson ? JSON.parse(data) : data,
        };
    }
  } catch (e) {
    console.log(e);
    return { message: 'error', data: e };
  }
};

module.exports = router;
