import { GraphQLServer, Options } from 'graphql-yoga';
import { loadSchema } from './utils/genSchema';
import { Context, Loaders } from 'graphql-utils';
import * as player from './player';
import { getPlayList } from './playlist';
import { getAudioFormat, getAudioUrl } from './helpers/youtube';
import { VideoInfoLoader } from './loaders';


export const createServer = () => {
  const schema = loadSchema() as any;

  const svr = new GraphQLServer({
    schema,
    context: ({ request, response }): Context => {
      return {
        url: request.protocol + '://' + request.get('host'),
        req: request,
        res: response,
        loaders: {
          videoInfo: new VideoInfoLoader(),
        },
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


// 재생 끝나면 플레이리스트 적당히 다시 재생
player.onEnded.subscribe(async () => {
  const playlist = getPlayList();
  const item = playlist.random();
  const info = await item.fetchInfo();
  const audio = getAudioFormat(info.formats);
  const url = getAudioUrl(audio);
  player.play(url);
});
