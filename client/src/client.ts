import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// TODO 하드코딩 어디로 옮기지?
const port = 3100;
const host = process.env.NODE_ENV === 'production'
  ? 'http://192.168.200.11'
  : 'http://localhost';

const httpLink = createHttpLink({
  uri: `${host}:${port}/graphql`,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
