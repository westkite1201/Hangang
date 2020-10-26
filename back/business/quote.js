module.exports = (function () {
  const model = require('../mongoose/model');

  async function getAllQuotes(args) {
    const { status } = args;
    const filter = {
      STATUS: status
    };
    console.log('[masonms] filter: ', filter);
    return await model.Quote.find(filter);
  }

  async function editQuotes(args) {
    const { id, name, word } = args;
    console.log('ids, name ', word);
    const set = {
      NAME: name,
      WORD: word
    };
    let updateRow = await Quotes.update(
      { _id: id },
      { $set: set },
      { multi: true }
    );
    let filter = {
      ACCEPTED: '0',
      STATUS: '0'
    };
    return await model.Quote.find(filter);
  }

  return {
    getAllQuotes: getAllQuotes,
    editQuotes: editQuotes
  };
})();
