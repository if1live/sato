import ffmpeg from 'fluent-ffmpeg';
import Debug from 'debug';
const debug = Debug('yt-term');

const ffmpegWithEvents = (url: string) => {
  return ffmpeg(url)
    .on('start', (commandLine: any) => {
      debug('Spawned FFmpeg with command: ' + commandLine)
    })
    .on('end', () => {
      debug('FFmpeg instance ended')
    })
    .on('error', (err: Error) => {
      console.error('FFmpeg error: ' + err.message)
    });
};

export const pcmAudio = (url: string) => {
  return ffmpegWithEvents(url)
    .noVideo()
    .audioCodec('pcm_s16le')
    .format('s16le');
};
