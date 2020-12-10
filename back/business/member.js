module.exports = (function(){
    const model = require('../mongoose/model');
    
    async function getAllUsers(){
      return await model.Member.find();
    }

    return {
      getAllUsers: getAllUsers
    };
})();