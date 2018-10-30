import { ResolverMap } from 'graphql-utils';
import { fromGlobalId } from 'graphql-relay';
import { getPlayList } from '@src/playlist';

export const resolvers: ResolverMap = {
  Node: {
    __resolveType: (parent, { }, { }) => {
      if (parent === undefined) {
        return undefined;
      }

      // TODO 타입 분기. parent를 제대로 확인할것
      return 'PlayListItem';
    },
  },
  Query: {
    node: (_, { id: nodeId }, { }) => {
      const { type, id } = fromGlobalId(nodeId);
      if (type === 'PlayListItem') {
        const playlist = getPlayList();
        const item = playlist.find(id);
        return item;

      } else {
        return undefined;
      }
    },
  },
};
