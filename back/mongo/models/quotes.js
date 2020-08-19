const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
const Schema = mongoose.Schema;

// Define Schemes
const quotesSchema = new Schema({
    name: { type: String, required: true },
    word: { type: String, required: true },
    thumbnail_user_image: { type: String, required: false, default: '' },
    thumbnail_background_image: { type: String, required: false, default: '' },
    accepted: { type: String, required: false, default: '1' },   // 0: 승인, 1: 대기, 2: 거절
    insert_time: { type: String, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    updat_time: { type: String, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    status: { type: String, default: '0'},   // 소재상태 0: 사용중, 1: 삭제됨
    card_exps_typ_cd: { type: String, require: false, default: '10'}    // 카드 노출 타입 10: 기본, 20: 세로카드블럭, 30: 썸네일카드블럭
}, {
    collection: 'QUOTES'
});

const model = mongoose.model;
module.exports = model('Quotes', quotesSchema);