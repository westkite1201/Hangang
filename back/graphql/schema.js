const dao = require('../business/dao');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    members: [Member]
    member(email: String!): Member
  }

  type Member{
    mem_email: String
    mem_password: String
  }

`);
// 맞춤 스칼라 타입 지정은 어떻게?
var resolver = {
  members: async (args, context, info) => {
    return await dao.member.getAllUsers();
  },
  member: async (args, context, info) => {
    const {email} = args;

    return await dao.member.getUser(email);
  }
};

module.exports = {schema: schema, root: resolver};