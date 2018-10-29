import ytdl from 'ytdl-core';

export interface AudioInfo {
  youtubeUrl: string;
  data: any;
  audioUrl: string;
  audioBitrate: number;
  audioEncoding: string;
}

export const fetchYoutubeInfo = (url: string) => {
  return new Promise((resolve, reject) => {
    ytdl.getInfo(url, (err: Error, info: any) => {
      if (err) { reject(err); }
      else { resolve(info); }
    });
  });
};

const getAudio = (info: any) => {
  // audio only, sorted by quality
  const audioItems = info.formats
    .filter((format: any) => format.resolution === null)
    .sort((a: any, b: any) => b.audioBitrate - a.audioBitrate);

  // highest bitrate
  const audio = audioItems[0];
  return audio;
};

const makeAudioInfo = (url: string, data: any, audio: any): AudioInfo => ({
  youtubeUrl: url,
  data,
  audioUrl: audio.url,
  audioBitrate: audio.audioBitrate,
  audioEncoding: audio.audioEncoding,
});

export const fetchAudioInfo = async (url: string) => {
  const data = await fetchYoutubeInfo(url);
  const audio = getAudio(data);
  const info = makeAudioInfo(url, data, audio);
  return info;
};

export const toJson = (x: AudioInfo) => {
  const { player_response } = x.data;
  const { videoDetails } = player_response;
  return {
    ...videoDetails,
    youtubeUrl: x.youtubeUrl,
    audioBitrate: x.audioBitrate,
    audioEncoding: x.audioEncoding,
    audioUrl: x.audioUrl,
  };
};

export const getVideoDetails = (x: AudioInfo) => {
  const { player_response } = x.data;
  const { videoDetails } = player_response;
  return videoDetails;
};
