import * as fs from 'mz/fs';
import { serverOption, server } from './server';
import { TextLoader, getPlayList } from './playlist';

const port = 3100;

const main = async () => {
  // load play list
  // TODO 구글 스프레드시트 기반으로 바꾸기
  const text = fs.readFileSync('playlists/my.txt', { encoding: 'utf8' });
  // const text = fs.readFileSync('playlists/dev.txt', { encoding: 'utf8' });
  const loader = new TextLoader(text);
  const playlist = getPlayList();
  for (const item of loader.load()) {
    playlist.push(item);
  }

  const option = { ...serverOption, port };
  const app = await server.start(option);
  console.log(`run server ${port}`);
  return app;
};
main();
