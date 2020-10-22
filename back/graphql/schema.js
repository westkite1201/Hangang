const dao = require('../business/dao');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    members: [Member]
    quotes(status: String): [Quote]
  }

  type Member{
    MEM_EMAIL: String
    MEM_PASSWORD: String
  }

  type Quote{
    NAME: String
    WORD: String
    FONT_COLOR: String
    THUMBNAIL_USER_IMAGE: String
    THUMBNAIL_BACKGROUND_IMAGE: String
    ACCEPTED: String
    INSERT_TIME: String
    UPDATE_TIME: String
    STATUS: String
    CARD_EXPS_TYP_CD: String
    CARD_ORDER: Int
  }
`);

// 맞춤 스칼라 타입 지정은 어떻게?
var resolver = {
  members: async (args, context, info) => {
    return await dao.member.getAllUsers();
  },
  quotes: async (args, context, info) => {
    console.log('[masonms] args: ', args)
    // console.log('[masonms] context: ', context.body)
    // console.log('[masonms] info: ', info)
    return await dao.quote.getAllQuotes(args);
  },
};

module.exports = {schema: schema, root: resolver};