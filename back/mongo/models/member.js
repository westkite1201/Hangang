const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
const Schema = mongoose.Schema;

// Define Schemes
const memberSchema = new Schema(
  {
    MEM_IDX: { type: String, required: true },
    MEM_EMAIL: { type: String, required: true },
    MEM_PASSWORD: { type: String, required: true },
    MEM_USER_NAME: { type: String, required: true },
    MEM_NICK_NAME: { type: String, required: false, default: '' },
    MEM_AVATER_PATH: { type: String, required: false, default: '' },
    MEM_INFO: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
    MEM_GB_CD: { type: String, required: false, default: '3' },
    MEM_REG_TIME: {
      type: String,
      default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    collection: 'MEMBER'
  }
);

const model = mongoose.model;
module.exports = model('Member', memberSchema);
