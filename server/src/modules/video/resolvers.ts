import { ResolverMap } from 'graphql-utils';
import { videoInfo } from 'ytdl-core';
import { getVideoCache } from '@src/helpers';
import { toGlobalId } from 'graphql-relay';

export const resolvers: ResolverMap = {
  Video: {
    id: (parent: videoInfo, { }, { }) => toGlobalId('Video', parent.video_id),
  },
  Mutation: {
    reloadVideo: async (_, { input }, { }) => {
      const { clientMutationId, videoId } = input;
      const video = getVideoCache().reload(videoId);

      return {
        clientMutationId,
        video,
      };
    },
  },
};
