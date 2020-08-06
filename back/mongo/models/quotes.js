const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
const Schema = mongoose.Schema;

// Define Schemes
const quotesSchema = new Schema({
    name: { type: String, required: true },
    word: { type: String, required: true },
    image: { type: String, required: false, default: '' },
    accepted: { type: String, required: true, default: '1' },   // 0: 승인, 1: 대기, 2: 거절
    insertTime: { type: Date, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') },
    updateTime: { type: Date, default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss') }
}, {
    collection: 'QUOTES'
});

// Insert Quotes
quotesSchema.statics.insertQuotes = function (payload) {
    // this ==> model
    const quote = new this(payload);
    // return Promise
    return quote.save();
}

// Find All Allow Quotes
quotesSchema.statics.findAllQuotes = function (payload) {
    return this.find({accepted: payload.accepted});
}

// Delete Quotes using _id
quotesSchema.statics.deleteQoutes = function (payload) {
    const id = payload.id;
    return this.deleteOne({
        _id: id
    });
}
const model = mongoose.model;
module.exports = model('Quotes', quotesSchema);