import ytdl, {
  videoInfo,
  videoFormat,
} from 'ytdl-core';

export const toYoutubeUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const fetchYoutubeInfo = (url: string): Promise<videoInfo> => {
  return new Promise((resolve, reject) => {
    ytdl.getInfo(url, (err: Error, info: any) => {
      if (err) { reject(err); }
      else { resolve(info); }
    });
  });
};

export const getAudioFormat = (formats: videoFormat[]) => {
  // audio only, sorted by quality
  const audioItems = formats
    .filter((format) => format.resolution === null)
    .sort((a, b) => b.audioBitrate - a.audioBitrate);

  // highest bitrate
  // return audioItems.length > 0 ? audioItems[0] : undefined;
  return audioItems[0];
};

export const getAudioUrl = (format: videoFormat) => format.url;

// 불필요한 정보를 지우면 json 크기를 줄일수 있다
export const sliceInfo = (info: videoInfo) => {
  const clone = { ...info };
  clone.formats = [];
  clone.related_videos = [];
  clone.player_response = undefined;
  clone.fexp = [];
  clone.fmt_list = [];
  clone.watermark = [];
  return clone;
};
