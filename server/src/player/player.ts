import { SpeakerProxy } from './SpeakerProxy';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import { Progress } from '@src/models/Progress';
import { Subject } from 'rxjs';
import * as events from './events';

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
    .on('start', (commandLine: string) => {
      startEvt.next(commandLine);
      events.source$.next(events.start());
    })
    .on('end', (stdout: any, stderr: any) => {
      events.source$.next(events.end());
      endEvt.next();
    })
    .on('error', (err: Error) => {
      events.source$.next(events.error(err));
      errorEvt.next(err);
    })
    .on('progress', (progress: Progress) => {
      events.source$.next(events.progress(progress));
      progressEvt.next(progress);
    })
    .on('codecData', (codec: any) => {
      events.source$.next(events.codecData(codec));
      speaker.setCodec(codec);
    });
};

export const play = (url: string) => {
  pcmAudio(url).pipe(speaker, { end: false });
};
