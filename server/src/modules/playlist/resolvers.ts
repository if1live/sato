import { ResolverMap } from 'graphql-utils';
import { getPlayList, PlayListItem, PlayList } from '@src/playlist';
import { encodeCursor } from '@src/helpers';
import { ConnectionArguments } from 'graphql-relay';



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
    search: async (_, { first, after, last, before }, { }) => {
      const args: ConnectionArguments = {
        first,
        after,
        last,
        before,
      };
      const playlist = getPlayList();
      const connection = playlist.connect(args);
      return connection;
    },
  },
};
