import { SpeakerProxy } from './SpeakerProxy';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import { Progress } from '@src/models/Progress';
import { Subject } from 'rxjs';

const speaker = new SpeakerProxy();

const startEvt = new Subject<string>();
const endEvt = new Subject<void>();
const errorEvt = new Subject<Error>();
const progressEvt = new Subject<Progress>();

export const onStarted = startEvt.asObservable();
export const onEnded = endEvt.asObservable();
export const onError = errorEvt.asObservable();
export const onProgress = progressEvt.asObservable();

export const pcmAudio = (url: string) => {
  return ffmpeg(url)
    .noVideo()
    .audioCodec('pcm_s16le')
    .format('s16le')
    .on('start', (commandLine: string) => startEvt.next(commandLine))
    .on('end', (stdout: any, stderr: any) => endEvt.next())
    .on('error', (err: Error) => errorEvt.next(err))
    .on('progress', (progress: Progress) => progressEvt.next(progress))
    .on('codecData', (codec: any) => speaker.setCodec(codec));
};

export const play = (url: string) => {
  pcmAudio(url).pipe(speaker, { end: false });
};
