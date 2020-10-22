module.exports = (function(){
    const model = require('../mongoose/model');
    
    async function getAllQuotes(args){
      const { status } = args
      const filter = {
        STATUS: status
      };
      console.log('[masonms] filter: ', filter)
      return await model.Quote.find(filter);
    }

    return {
        getAllQuotes: getAllQuotes
    };
})();