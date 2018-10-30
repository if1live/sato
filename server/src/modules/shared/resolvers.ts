import { ResolverMap } from 'graphql-utils';

export const resolvers: ResolverMap = {
  Node: {
    __resolveType: (parent, { }, { }) => {
      // TODO
      return 'Audio';
    },
  },
  Query: {
    node: (_, { id }, { }) => {
      // TODO
      return null;
    },
  },
};
