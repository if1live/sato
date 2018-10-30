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
