const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
const Schema = mongoose.Schema;

// Define Schemes
const quotesSchema = new Schema({
    name: { type: String, required: true },
    word: { type: String, required: true },
    image: { type: String, required: false, default: '' },
    accepted: { type: String, required: false, default: '1' },   // 0: 승인, 1: 대기, 2: 거절
    insertTime: { type: String, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    updateTime: { type: String, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    status: { type: String, default: '0'}   // 소재상태 '0' 사용중, '1' 삭제됨
}, {
    collection: 'QUOTES'
});

const model = mongoose.model;
module.exports = model('Quotes', quotesSchema);