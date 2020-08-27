const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
const Schema = mongoose.Schema;

// Define Schemes
const quotesSchema = new Schema({
    NAME: { type: String, required: true },
    WORD: { type: String, required: true },
    THUMBNAIL_USER_IMAGE: { type: String, required: false, default: '' },
    THUMBNAIL_BACKGROUND_IMAGE: { type: String, required: false, default: '' },
    ACCEPTED: { type: String, required: false, default: '1' },   // 0: 승인, 1: 대기, 2: 거절
    INSERT_TIME: { type: String, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    UPDATE_TIME: { type: String, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    STATUS: { type: String, default: '0'},   // 소재상태 0: 사용중, 1: 삭제됨
    CARD_EXPS_TYP_CD: { type: String, require: false, default: '10'}    // 카드 노출 타입 10: 기본, 20: 세로카드블럭, 30: 썸네일카드블럭
}, {
    collection: 'QUOTES'
});

const model = mongoose.model;
module.exports = model('Quotes', quotesSchema);