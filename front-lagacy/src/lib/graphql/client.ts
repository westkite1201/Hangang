//import ApolloClient from 'apollo-boost';
import clientConfig from '../../configuration/clientConfig';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const host =
  (process.env.REACT_APP_API_HOST === 'develop'
    ? 'http://localhost:3031/'
    : clientConfig.endpoint.web) || '/';

const graphqlURI = host.concat('graphql');
// const link = createHttpLink({
//   uri: 'http://localhost:3031/graphql',
// });

const client = new ApolloClient({
  link: createHttpLink({
    uri: graphqlURI
    //uri: 'http://localhost:3031/graphql',
  }),
  cache: new InMemoryCache()
});

// (window as any).client = client;

export default client;
