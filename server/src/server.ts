import { GraphQLServer, Options } from 'graphql-yoga';
import { loadSchema } from './utils/genSchema';
import { Context } from 'graphql-utils';

export const createServer = () => {
  const schema = loadSchema() as any;

  const svr = new GraphQLServer({
    schema,
    context: ({ request, response }): Context => {
      return {
        url: request.protocol + '://' + request.get('host'),
        req: request,
        res: response,
      };
    },
  });
  return svr;
};

export const serverOption: Options = {
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

export const server = createServer();
