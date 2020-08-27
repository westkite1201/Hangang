const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
const Schema = mongoose.Schema;

// Define Schemes
const hangangTempSchema = new Schema(
  {
    MSR_DATE: { type: String, required: true },
    MSR_TIME: { type: String, required: true },
    SITE_ID: { type: String, required: true },
    W_TEMP: { type: String, required: false, default: '' },
    W_PH: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    W_DO: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    W_TP: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    W_TOC: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    W_PHEN: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    W_CN: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    INSERT_TIME: {
      type: String,
      default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
    },
    UPDATE_TIME: {
      type: String,
      default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    collection: 'HANGANG'
  }
);

const model = mongoose.model;
module.exports = model('HangangTemp', hangangTempSchema);
