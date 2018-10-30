import { AudioInfo, fetchAudioInfo } from './youtube';
import * as youtube from './youtube';

export class MyPlayList {
  private items: AudioInfo[] = [];

  public async enqueue(url: string) {
    try {
      const info = await fetchAudioInfo(url);
      this.items.push(info);
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async sync() {
    // TODO google spreadsheet sync
  }

  public random() {
    if (this.items.length === 0) {
      return undefined;
    }

    const r = Math.random() * this.items.length;
    const idx = Math.floor(r);
    return this.items[idx];
  }

  public toJson() {
    return this.items.map(youtube.toJson);
  }
}

