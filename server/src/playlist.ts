import { videoInfo } from 'ytdl-core';
import { fetchYoutubeInfo, toYoutubeUrl } from './helpers/youtube';

export class PlayListItem {
  // youtube video id 쓰면 될듯
  public readonly audioId: string;
  private info?: videoInfo;

  constructor(audioId: string, info?: videoInfo) {
    this.audioId = audioId;
    this.info = info;
  }

  public async fetchInfo() {
    // TODO local cache가 있으면 playlist 미리보기가 더 그럴싸할거다
    if (this.info === undefined) {
      const url = toYoutubeUrl(this.audioId);
      const info = await fetchYoutubeInfo(url);
      this.info = info;
    }
    return this.info;
  }
}

export class PlayList {
  private items: PlayListItem[] = [];

  public push(item: PlayListItem) {
    this.items = [...this.items, item];
  }

  public clear() {
    this.items = [];
  }

  public get length() {
    return this.items.length;
  }

  public find(audioId: string) {
    const founds = this.items.filter((x) => x.audioId === audioId);
    return founds.length > 0 ? founds[0] : undefined;
  }
}

export interface Loader {
  load(): PlayListItem[];
}

export class TextLoader implements Loader {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public load(): PlayListItem[] {
    const lines = this.text
      .split('\n')
      .map((x) => x.trim());
    const ids = lines
      .map((line) => this.parse(line))
      .filter((x) => x !== undefined)
      .map((x) => x as string);
    const items = ids.map((id) => new PlayListItem(id));
    return items;
  }

  private parse(line: string) {
    if (line.length === 0) { return undefined; }
    if (line.startsWith('#')) { return undefined; }
    if (line.startsWith('//')) { return undefined; }
    return line;
  }
}

export class GoogleSpreadsheetLoader implements Loader {
  public load(): PlayListItem[] {
    throw new Error('Method not implemented.');
  }
}

// 플레이리스트에서 같은 값이 연속으로 나오면 재미없을것이다
// 이전에 나온 값을 될수있는한 피하는 랜덤함수
export class RandomGenerator {
  private queue: number[] = [];
  private readonly queueSize: number;
  private readonly retry: number;

  constructor(queueSize: number, retry: number) {
    this.queueSize = queueSize;
    this.retry = retry;
  }

  public random(opts: { min?: number, max?: number }) {
    const min = opts.min !== undefined ? opts.min : 0;
    const max = opts.max !== undefined ? opts.max : Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < this.retry; i++) {
      const v = this.pick(min, max);
      const found = this.queue.indexOf(v) >= 0;
      if (!found) {
        this.enqueue(v);
        return v;
      }
    }
    // else...
    return this.pick(min, max);
  }

  public pick(min: number, max: number) {
    const r = Math.random();
    return Math.floor(r * (max - min + 1)) + min;
  }

  private enqueue(v: number) {
    this.queue.push(v);
    if (this.queue.length > this.queueSize) {
      this.queue.shift();
    }
  }
}

const defaultPlayList = new PlayList();

export const getPlayList = () => defaultPlayList;
