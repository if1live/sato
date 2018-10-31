import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// TODO 하드코딩 어디로 옮기지?

export const portProd = 3100;
export const portDev = 3000;

export const port = process.env.NODE_ENV === 'production'
  ? portProd : portDev;
export const host = process.env.NODE_ENV === 'production'
  ? 'http://192.168.200.11'
  : 'http://localhost';

const httpLink = createHttpLink({
  uri: `/graphql`,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
