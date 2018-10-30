import stream from 'stream';
import Speaker, { Options } from 'speaker';
import { CheckResultAndHandleErrors } from 'graphql-tools';

const makeSpeakerOption = (codec: any): Options => ({
  channels: codec.audio_details[2] === 'mono' ? 1 : 2,
  sampleRate: parseInt(codec.audio_details[1].match(/\d+/)[0], 10),
});


export class SpeakerProxy extends stream.Writable {
  private speaker?: Speaker;
  private options?: Options;

  public setCodec(codec: any) {
    const opts = makeSpeakerOption(codec);

    if (this.speaker === undefined) {
      this.speaker = new Speaker(opts);
      this.options = opts;

    } else {
      // reuse speaker
      // TODO speaker 규격을 보니 런타임에 스피커 설절을 건드릴수 없다
      // youtube-terminal 구현체를 보면 내부 변수를 그냥 고치던데
      // 이건 정석같지 않다. 그래서 일단 방치
      // 나중에 speaker 구현체를 바꾸는것으로 우회하자
      const prevOpts = this.options as Options;
      const channels = [prevOpts.channels, opts.channels];
      const sampleRate = [prevOpts.sampleRate, opts.sampleRate];
      if (channels[0] !== channels[1]) {
        console.error(`different channel: prev=${channels[0]}, curr=${channels[1]}`);
      }
      if (sampleRate[0] !== sampleRate[1]) {
        console.error(`different sample rate: prev=${sampleRate[0]}, curr=${sampleRate[1]}`);
      }
    }
  }

  public reset() {
    this.speaker = undefined;
  }

  public _write(
    chunk: any,
    encoding: string,
    callback: (error?: Error | null) => void,
  ): void {
    if (this.speaker !== undefined) {
      this.speaker._write(chunk, encoding, callback);
    }
  }

  public close(flush: boolean) {
    if (this.speaker !== undefined) {
      this.speaker.close(flush);
    }
  }
}

