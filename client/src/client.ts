import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const portProd = 3100;
export const portDev = 3000;

export const port = process.env.NODE_ENV === 'production'
  ? portProd : portDev;

const httpLink = createHttpLink({
  uri: `/graphql`,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
