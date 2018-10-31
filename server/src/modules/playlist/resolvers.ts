import { ResolverMap } from 'graphql-utils';
import { getPlayList, PlayListItem, PlayList, RandomGenerator } from '@src/playlist';
import { encodeCursor } from '@src/helpers';



export const resolvers: ResolverMap = {
  PlayList: {
    random: (parent: PlayList, { }, { }) => parent.random(),
  },
  PlayListItem: {
    id: (parent: PlayListItem, { }, { }) => parent.nodeId,
    video: async (parent: PlayListItem, { }, { loaders }) => {
      return await loaders.videoInfo.load(parent.videoId);
    },
  },
  Query: {
    search: async (_, { }, { }) => {
      // TODO 일단 전체 반환으로 구현. 나중에 재대로 된거로 고치기
      const playlist = getPlayList();
      const items = playlist.getItems();
      const edges = items.map((item, idx) => {
        const cursor = encodeCursor(idx);
        return {
          node: item,
          cursor,
        };
      });
      const pageInfo = {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: 'TODO',
        endCursor: 'TODO',
      };
      return {
        edges,
        pageInfo,
      };
    },
  },
};
