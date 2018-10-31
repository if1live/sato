import { SpeakerProxy } from './SpeakerProxy';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import { Progress } from '@src/models/Progress';
import { Subject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import * as events from './events';

type CodecData = any;

const speaker = new SpeakerProxy();

const start = new Subject<string>();
const end = new Subject<void>();
const error = new Subject<Error>();
const progress = new Subject<Progress>();
const codecData = new Subject<CodecData>();

export const start$ = start.asObservable();
export const end$ = end.asObservable();
export const error$ = error.asObservable();
export const progress$ = progress.asObservable();
export const codecData$ = codecData.asObservable();


export const pcmAudio = (url: string) => {
  return ffmpeg(url)
    .noVideo()
    .audioCodec('pcm_s16le')
    .format('s16le')
    .on('start', (commandLine: string) => start.next(commandLine))
    .on('end', (stdout: any, stderr: any) => end.next())
    .on('error', (err: Error) => error.next(err))
    .on('progress', (p: Progress) => progress.next(p))
    .on('codecData', (codec: CodecData) => codecData.next(codec));
};

export const play = (url: string) => {
  pcmAudio(url).pipe(speaker, { end: false });
};

codecData$.subscribe((codec) => {
  speaker.setCodec(codec);
});

const startEvent$ = start$.pipe(map((x) => events.start(x)));
const endEvent$ = end$.pipe(map((x) => events.end()));
const errorEvent$ = error$.pipe(map((x) => events.error(x)));
const progressEvent$ = progress$.pipe(map((x) => events.progress(x)));
const codecDataEvent$ = codecData$.pipe(map((x) => events.codecData(x)));

export const source$ = merge(
  startEvent$,
  endEvent$,
  errorEvent$,
  progressEvent$,
  codecDataEvent$,
);
