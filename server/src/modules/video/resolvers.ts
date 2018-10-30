import { ResolverMap } from 'graphql-utils';
import { videoInfo } from 'ytdl-core';

export const resolvers: ResolverMap = {
  Video: {
    id: (parent: videoInfo, { }, { }) => {
      return 'TODO';
    },
  },
};
