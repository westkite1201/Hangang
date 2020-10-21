module.exports = (function(){
    const model = require('../mongoose/model');
  
    // https://mongoosejs.com/docs/guide.html#id
    async function getUser(email){
      return await model.Member.findOne({email: email}); // 없을땐 null
    }
  
    async function getAllUsers(){
      return await model.Member.find();
    }

    return {
      getUser: getUser,
      getAllUsers: getAllUsers
    };
})();