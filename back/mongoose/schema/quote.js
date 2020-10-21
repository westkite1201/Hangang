module.exports = function(mongoose){
    const moment = require('moment');
    require('moment-timezone');
    return new mongoose.Schema(
        {
            NAME: { type: String, required: true },
            WORD: { type: String, required: true },
            FONT_COLOR: { type: String, required: false, default: 'white' },
            THUMBNAIL_USER_IMAGE: { type: String, required: false, default: '' },
            THUMBNAIL_BACKGROUND_IMAGE: { type: String, required: false, default: '' },
            ACCEPTED: { type: String, required: false, default: '1' }, // 0: 승인, 1: 대기, 2: 거절
            INSERT_TIME: {
              type: String,
              default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
            },
            UPDATE_TIME: {
              type: String,
              default: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
            },
            STATUS: { type: String, default: '0' }, // 소재상태 0: 사용중, 1: 삭제됨
            CARD_EXPS_TYP_CD: { type: String, require: false, default: '10' }, // 카드 노출 타입 10: 기본, 20: 세로카드블럭, 30: 썸네일카드블럭
            CARD_ORDER: { type: Number, require: false }  // 카드 정렬 순서
        },
        {
            collection: 'QUOTES'
        }
    );
  };