import { pcmAudio } from "./pcm-audio";

var Speaker = require('speaker');
var ytdl = require('ytdl-core');
var debug = require('debug')('yt-term');

function play(url: string) {
  ytdl.getInfo(url, function (err: Error, info: any) {
    if (err) { return console.error(err); }

    playAudio(info)
  });
}


function playAudio(info: any) {
  // audio only, sorted by quality
  var audioItems = info.formats
    .filter(function (format: any) { return format.resolution === null })
    .sort(function (a: any, b: any) { return b.audioBitrate - a.audioBitrate })

  // highest bitrate
  var audio = audioItems[0]

  debug('Audio quality: %s (%s)', audio.audioBitrate + 'kbps', audio.audioEncoding)

  var speaker = new Speaker()

  var updateSpeaker = function (codec: any) {
    speaker.channels = codec.audio_details[2] === 'mono' ? 1 : 2
    speaker.sampleRate = parseInt(codec.audio_details[1].match(/\d+/)[0], 10)
  }

  // play audio
  pcmAudio(audio.url).on('codecData', updateSpeaker).pipe(speaker)
}

play('https://www.youtube.com/watch?v=JOUyhE-9bBs');
