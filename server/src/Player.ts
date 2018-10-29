import { AudioStream } from './AudioStream';
import { delay } from './helpers';
import { PlayList } from './PlayList';
import { AudioInfo, getVideoDetails } from './youtube';

export class Player {
  private readonly audio: AudioStream;
  private readonly playlist: PlayList;

  public current?: AudioInfo;

  constructor(audio: AudioStream, playlist: PlayList) {
    this.audio = audio;
    this.playlist = playlist;

    audio.onStarted.subscribe((commandLine) => {
      // console.log('Spawned FFmpeg with command: ' + commandLine);
    });
    audio.onError.subscribe((err) => {
      console.error('FFmpeg error: ' + err.message);
    });
    audio.onProgress.subscribe((progress) => {
      // console.log(`Processing: ${progress.percent}% done`);
      console.log(`Processing: ${progress.timemark}`);
    });
    audio.onEnded.subscribe(async () => {
      console.log('FFmpeg instance ended');

      // pipe가 전부 처리될때까지 대기
      // TOOD pcm audio pip의 끝을 확실히 인식할 방법이 있으면 바꾸기
      await delay(3_000);
      const item = playlist.random();
      if (item) {
        await this.play(item);
      }
    });
  }

  public async play(info: AudioInfo) {
    const details = getVideoDetails(info);
    console.log(`play: ${details.title}`);

    this.audio.play(info.audioUrl);
    this.current = info;
    return true;
  }

  public async stop() {
    this.current = undefined;
    await this.audio.stop();
  }
}
