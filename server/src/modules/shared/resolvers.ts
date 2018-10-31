import { ResolverMap } from 'graphql-utils';
import { fromGlobalId } from 'graphql-relay';
import { getPlayList, PlayListItem } from '@src/playlist';
import { getVideoCache } from '@src/helpers';
import { videoInfo } from 'ytdl-core';


const getVideo = async (id: string) => {
  const cache = getVideoCache();
  if (await cache.has(id)) {
    const video = await cache.get(id);
    return video;

  } else {
    const video = await cache.reload(id);
    return video;
  }
};

const getPlayListItem = (id: string) => {
  const playlist = getPlayList();
  const item = playlist.find(id);
  return item;
};

const isVideoInfo = (x: any): x is videoInfo => {
  // videoInfo를 상속받아서 확장하기 귀찮았다
  // 그래서 ytdl-core의 videoInfo를 그대로 쓴다
  if (x.video_url !== undefined) {
    return true;
  }
  return false;
};

const isPlayListItem = (x: any): x is PlayListItem => {
  return (x.type !== undefined && x.type === 'PlayListItem');
};

export const resolvers: ResolverMap = {
  Viewer: {
    playlist: (_, { }, { }) => getPlayList(),
  },
  Node: {
    __resolveType: (parent, { }, { }) => {
      if (parent === undefined) { return undefined; }
      if (isVideoInfo(parent)) { return 'Video'; }
      if (isPlayListItem(parent)) { return 'PlayListItem'; }
      return undefined;
    },
  },
  Query: {
    viewer: (_, { }, { }) => ({}),
    node: async (_, { id: nodeId }, { }) => {
      const { type, id } = fromGlobalId(nodeId);
      switch (type) {
        case 'PlayListItem': return getPlayListItem(id);
        case 'Video': return getVideo(id);
        default: return undefined;
      }
    },
  },
};
