import { pcmAudio } from './pcm-audio';
import Debug from 'debug';
import { SpeakerProxy } from './SpeakerProxy';
const debug = Debug('yt-term');
// TODO wrapper?
const ytdl = require('ytdl-core');

const play = (url: string) => {
  ytdl.getInfo(url, (err: Error, info: any) => {
    if (err) { return console.error(err); }
    playAudio(info)
  });
}

const speakerProxy = new SpeakerProxy();

const playAudio = (info: any) => {
  // audio only, sorted by quality
  const audioItems = info.formats
    .filter((format: any) => format.resolution === null)
    .sort((a: any, b: any) => b.audioBitrate - a.audioBitrate);

  // highest bitrate
  const audio = audioItems[0]

  debug('Audio quality: %s (%s)', audio.audioBitrate + 'kbps', audio.audioEncoding)

  // play audio
  pcmAudio(audio.url).on('codecData', (codec: any) => {
    speakerProxy.setCodec(codec);
  }).pipe(speakerProxy);
}

play('https://www.youtube.com/watch?v=JOUyhE-9bBs');
