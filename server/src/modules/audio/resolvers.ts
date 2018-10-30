import { ResolverMap } from 'graphql-utils';
import { getPlayList } from '@src/playlist';
import * as player from '@src/player';
import { getAudioFormat, getAudioUrl } from '@src/helpers/youtube';

export const resolvers: ResolverMap = {
  Viewer: {
    playlist: (_, { }, { }) => getPlayList(),
  },
  Query: {
    viewer: (_, { }, { }) => ({}),
  },
  Mutation: {
    playAudio: async (_, { input }, { }) => {
      const { clientMutationId, audioId } = input;
      const playlist = getPlayList();
      const item = playlist.find(audioId);

      if (item) {
        const info = await item.fetchInfo();
        const audio = getAudioFormat(info.formats);
        const url = getAudioUrl(audio);
        player.play(url);

        return {
          clientMutationId,
          ok: true,
        };

      } else {
        return {
          clientMutationId,
          ok: false,
        };
      }


    },
    stopAudio: async (_, { input }, { }) => {
      // TODO

      const { clientMutationId } = input;

      return {
        clientMutationId,
      };
    },
  },
};
