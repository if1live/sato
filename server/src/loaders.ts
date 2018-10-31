import DataLoader from 'dataloader';
import { videoInfo } from 'ytdl-core';
import { getVideoCache } from './helpers/cache';

export class VideoInfoLoader extends DataLoader<string, videoInfo | undefined> {
  constructor(options?: DataLoader.Options<string, videoInfo | undefined>) {
    const batch = async (videoIds: string[]) => {
      const tasks = videoIds.map((videoId) => getVideoCache().get(videoId));
      const founds = await Promise.all(tasks);
      return founds;
    };
    super(batch, options);
  }
}
