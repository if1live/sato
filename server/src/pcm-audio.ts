import ffmpeg from 'fluent-ffmpeg';

var debug = require('debug')('yt-term')

function ffmpegWithEvents(url: string) {
  return ffmpeg(url)
    .on('start', function (commandLine: any) {
      debug('Spawned FFmpeg with command: ' + commandLine)
    })
    .on('end', function () {
      debug('FFmpeg instance ended')
    })
    .on('error', function (err: Error) {
      console.error('FFmpeg error: ' + err.message)
    });
};

export const pcmAudio = (url: string) => {
  return ffmpegWithEvents(url)
    .noVideo()
    .audioCodec('pcm_s16le')
    .format('s16le')
};
