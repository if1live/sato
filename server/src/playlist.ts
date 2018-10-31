import { videoInfo } from 'ytdl-core';
import { fetchYoutubeInfo, toYoutubeUrl } from './helpers/youtube';
import {
  toGlobalId,
  connectionFromArray,
  ConnectionArguments,
} from 'graphql-relay';
import _ from 'lodash';

export class PlayListItem {
  public readonly type = 'PlayListItem';

  // youtube video id 쓰면 될듯
  public readonly videoId: string;
  private info?: videoInfo;

  constructor(videoId: string, info?: videoInfo) {
    this.videoId = videoId;
    this.info = info;
  }

  public async fetchInfo() {
    // TODO local cache가 있으면 playlist 미리보기가 더 그럴싸할거다
    if (this.info === undefined) {
      const url = toYoutubeUrl(this.videoId);
      const info = await fetchYoutubeInfo(url);
      this.info = info;
    }
    return this.info;
  }

  public get nodeId() {
    return toGlobalId('PlayListItem', this.videoId);
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

  public find(videoId: string) {
    const founds = this.items.filter((x) => x.videoId === videoId);
    return founds.length > 0 ? founds[0] : undefined;
  }

  public connect(args: ConnectionArguments) {
    return connectionFromArray(this.items, args);
  }

  public get(idx: number) { return this.items[idx]; }

  public random() {
    const r = Math.floor(Math.random() * this.length + 1);
    return this.items[r];
  }

  public shuffle() {
    this.items = _.shuffle(this.items);
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

const defaultPlayList = new PlayList();

export const getPlayList = () => defaultPlayList;
