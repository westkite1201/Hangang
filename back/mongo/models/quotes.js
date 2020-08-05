const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schemes
const quotesSchema = new Schema({
    name: { type: String, required: true },
    word: { type: String, required: true }
}, {
    collection: 'QUOTES',
    timestamps: true
});

// Insert Quotes
quotesSchema.statics.insertQuotes = function (payload) {
    // this ==> model
    const quote = new this(payload);
    // return Promise
    return quote.save();
}

// Find All
quotesSchema.statics.findAllQuotes = function () {
    return this.find({});
}

const model = mongoose.model;
module.exports = model('Quotes', quotesSchema);