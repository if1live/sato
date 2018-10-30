import { ResolverMap } from 'graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { }, { }) => 'hello',
  },
};
