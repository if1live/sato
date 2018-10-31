import { videoInfo } from 'ytdl-core';
import * as fs from 'mz/fs';
import { toYoutubeUrl, fetchYoutubeInfo, sliceInfo } from './youtube';

// 플레이 리스트를 그럴싸하게 보여주려면 메타데이터를 알고있어야한다
// 필요할때마다 메타데이터를 불러오면 느리다
// 이전에 읽어온건 캐시에 저장하자

const toFilePath = (videoId: string) => {
  return `.cache/${videoId}.json`;
};

export class Cache<T> {
  public async get(id: string) {
    const fp = toFilePath(id);
    try {
      const text = await fs.readFile(fp, { encoding: 'utf8' });
      const json = JSON.parse(text) as T;
      return json;

    } catch (err) {
      return undefined;
    }
  }

  public async set(id: string, info: T) {
    const json = JSON.stringify(info, null, 2);
    const fp = toFilePath(id);
    await fs.writeFile(fp, json, { encoding: 'utf8' });
  }

  public async has(id: string) {
    const fp = toFilePath(id);
    return await fs.exists(fp);
  }

  public async delete(id: string) {
    const fp = toFilePath(id);
    try {
      await fs.unlink(fp);
    } catch (err) {
      return;
    }
  }
}


export class VideoInfoCache extends Cache<videoInfo>{
  public async reload(id: string) {
    const url = toYoutubeUrl(id);
    const info = await fetchYoutubeInfo(url);

    const sliced = sliceInfo(info);
    await this.set(id, sliced);

    return info;
  }
}

const videoCache = new VideoInfoCache();
export const getVideoCache = () => videoCache;
