import { SpeakerProxy } from './SpeakerProxy';
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import Debug from 'debug';
import { Subject } from 'rxjs';

const debug = Debug('sato');

/*
{ frames: NaN,
currentFps: NaN,
currentKbps: 1535.9,
targetSize: 2325,
timemark: '00:00:12.40',
percent: 0.12484167005534615 }
*/
interface Progress {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
  percent: number;
}

export class AudioStream {
  public onStarted: Subject<string> = new Subject<string>();
  public onEnded: Subject<void> = new Subject<void>();
  public onError: Subject<Error> = new Subject<Error>();
  public onProgress: Subject<Progress> = new Subject<Progress>();

  private command?: ffmpeg.FfmpegCommand;

  public async play(audioUrl: string) {
    const speaker = new SpeakerProxy();
    this.command = ffmpeg(audioUrl)
      .noVideo()
      .audioCodec('pcm_s16le')
      .format('s16le')
      .on('start', (commandLine: string) => this.onStarted.next(commandLine))
      .on('end', async (stdout: any, stderr: any) => this.onEnded.next())
      .on('error', (err: Error) => this.onError.next(err))
      .on('codecData', (codec: any) => speaker.setCodec(codec))
      .on('progress', (progress: Progress) => this.onProgress.next(progress));

    this.command
      .pipe(speaker, {
        end: true,
      });

    return true;
  }

  public async stop() {
    // TODO 명시적으로 ffmpeg 끝내기 되나?
    this.command = undefined;
  }
}

