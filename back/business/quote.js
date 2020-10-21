module.exports = (function(){
    const model = require('../mongoose/model');
    
    async function getAllQuotes(){
      return await model.Quote.find();
    }

    return {
        getAllQuotes: getAllQuotes
    };
})();