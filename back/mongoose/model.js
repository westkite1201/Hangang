module.exports = (function(){
    const moment = require('moment');
    const mongoose = require('mongoose');

    const db = mongoose
      .connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        var date = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
        console.log('inner mongodb connection success ', date);
      })
      .catch((e) => console.error(e));

    mongoose.connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const schema = {};
    const model = {};
    
    // Schema가 추가되면 여기에 추가로 등록
    // schema.Member = require('./schema/member')(mongoose);
    schema.Quote = require('./schema/quote')(mongoose);

    for(let k in schema){
        model[k] = mongoose.model(k, schema[k]);
    }
    
    return model;
})();