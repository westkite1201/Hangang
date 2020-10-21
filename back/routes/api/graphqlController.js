const { buildSchema } = require('graphql');

let Quotes = require('../../mongo/models/quotes');
let Member = require('../../mongo/models/member');
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String,
    bye: String,
    quotes: Quotes,
    members: Members
  }

  type Quotes {
    name: String,
    word: String
  }

  type Members {
    mem_email: String,
    mem_password: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  bye: () => {
    return 'Bye World!';
  },
  quotes: async () => {
    return await Quotes.find({});
  },
  members: async () => {
      console.log('[masonms] route members')
      return await Member.getMember();
  }
};

module.exports = {
    resolver: root,
    schema: schema
}