const { buildSchema } = require('graphql');

let Quotes = require('../../mongo/models/quotes');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String,
    bye: String,
    quotes: Quotes
  }

  type Quotes {
      name: String,
      word: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  bye: () => {
      return 'Bye World!';
  }
};

module.exports = {
    resolver: root,
    schema: schema
}