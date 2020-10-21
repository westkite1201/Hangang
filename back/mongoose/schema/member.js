module.exports = function(mongoose){
  const moment = require('moment');
  require('moment-timezone');
  return new mongoose.Schema(
    {
      MEM_EMAIL: { type: String, required: true },
      MEM_PASSWORD: { type: String, required: true },
      MEM_USER_NAME: { type: String, required: true },
      MEM_NICK_NAME: { type: String, required: false, default: '' },
      MEM_AVATER_PATH: { type: String, required: false, default: '' },
      MEM_INFO: { type: String, required: false, default: '' }, // 0: 승인, 1: 대기, 2: 거절
      MEM_GB_CD: { type: String, required: false, default: '3' }, // 1어드민 //2 ? ,3 //일반
      MEM_REG_TIME: {
        type: String,
        default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
      },
      MEM_USER_ID: {
        type: String,
        required: false,
        default: parseInt(Math.random() * 10000000000)
      },
      MEM_SIGN_TYPE: { type: String, required: true }
    },
    {
      collection: 'MEMBER'
    }
  );
};